import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { getCredits, getProjectVisitors } from '../../redux/projects/action';
import EnrichModal from '../../components/ui/EnrichModal';
import rolling from '../../assets/images/rolling.gif';
import AddCreditModal from '../../components/ui/AddCreditModal';
import ApiKeyModal from '../../components/ui/ApiKeyModal';

const TrafficTable = () => {
    const { key} = useParams();
    const dispatch = useDispatch();
    const loadingCredits=useSelector((state)=>state.projectReducer?.getCredits?.loading)

    const credits=useSelector((state)=>state.projectReducer?.getCredits?.data)
    const [selectedRowCount, setSelectedRowCount] = useState(0);


    useEffect(() => {
        dispatch(getCredits({secret_key:key}))
        dispatch(getProjectVisitors({ secret_key: key }));
    }, [key]);

    const data = useSelector((state) => state.projectReducer.getProjectVisitors?.data);
    const loading = useSelector((state) => state.projectReducer.getProjectVisitors?.loading);

    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);
    const [selectedIPs, setSelectedIPs] = useState([]);

    const uniqueStates = [...new Set(data?.map((item) => item.state))];
    const uniqueZipCodes = [...new Set(data?.map((item) => item.zip_code))];

    const stateOptions = uniqueStates.map((state) => ({ label: state, value: state }));
    const zipCodeOptions = uniqueZipCodes.map((zip) => ({ label: zip, value: zip }));

    const filteredData = data?.filter((item) => {
        const matchesState =
            selectedStates.length > 0
                ? selectedStates.some((selected) => selected.value === item.state)
                : true;

        const matchesZipCode =
            selectedZipCodes.length > 0
                ? selectedZipCodes.some((selected) => selected.value === item.zip_code)
                : true;

        return matchesState && matchesZipCode;
    }).reverse();

    // Get today's date
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    };

    const todayDate = getTodayDate();

    // Filter new visitors (unique visitors for today)
    const calculateNewVisitors = (data) => {
        const today = new Date();
        const todayDate = today.toLocaleDateString('en-US'); // Format: MM/DD/YYYY
    
        const todayVisitors = data?.filter((item) => {
            const visitDate = item?.visit_time?.split(',')[0].trim(); // Extract date portion (MM/DD/YYYY)
            return visitDate === todayDate; // Compare with today's date
        });
    
        const ipCounts = new Map();
        todayVisitors?.forEach((item) => {
            ipCounts.set(item.ip_address, (ipCounts.get(item.ip_address) || 0) + 1);
        });
    
        // Count unique IPs for today
        const newVisitorCount = Array.from(ipCounts.values()).filter((count) => count === 1).length;
        return newVisitorCount;
    };

    const newVisitorCount = calculateNewVisitors(filteredData);

    // Calculate total unique and returning visitors
    const calculateIPCounts = (data) => {
        const ipCounts = new Map();
        data?.forEach((item) => {
            ipCounts.set(item.ip_address, (ipCounts.get(item.ip_address) || 0) + 1);
        });
    
        // Unique IPs (including duplicates counted only once)
        const uniqueIPs = new Set(ipCounts.keys());
        const uniqueIPCount = uniqueIPs.size;
    
        // Repeated IPs (appear more than once)
        const repeatIPCount = Array.from(ipCounts.values()).filter((count) => count > 1).length;
    
        return { uniqueIPCount, repeatIPCount };
    };
    

    const { uniqueIPCount, repeatIPCount } = calculateIPCounts(filteredData);

    const columns = [
        {
            name: 'IP Address',
            selector: (row) => row.ip_address,
            sortable: true,
        },
        {
            name: 'Page URL',
            selector: (row) => row.page_url,
            sortable: true,
        },
        {
            name: 'Checkin time',
            selector: (row) => row.visit_time,
            sortable: true,
        },
        {
            name: 'Checkout time',
            selector: (row) => row.left_time,
            sortable: true,
        },
        {
            name: 'Session time',
            selector: (row) => row.session_time,
            sortable: true,
        },
        {
            name: 'State',
            selector: (row) => row.state,
            sortable: true,
        },
        {
            name: 'Zip Code',
            selector: (row) => row.zip_code,
            sortable: true,
        },
    ];

    const handleSelectedRowsChange = (state) => {
        const selectedRows = state.selectedRows;
        // console.log("selectedRows++++++++++++++++++++",selectedRows)
        setSelectedIPs(selectedRows.map((row) => ({ IP: row.ip_address, ipZipCode: row.zip_code,zip_code: row.zip_code, state: row.state ,country:row.country,isp:row.isp,domain_url:row.domain_url,city:row.city })));
        setSelectedRowCount(selectedRows.length);
    };

    // Function to generate CSV from data
    const generateCSV = (data) => {
        const headers = ['IP Address', 'Page URL', 'Checkin time', 'Checkout time', 'Session time', 'State', 'Zip Code'];
        const rows = data.map((row) => [
            row.ip_address,
            row.page_url,
            row.visit_time,
            row.left_time,
            row.session_time,
            row.state,
            row.zip_code,
        ]);

        // Combine headers and rows
        const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
        return csvContent;
    };

    // Function to trigger CSV download
    const downloadCSV = () => {
        const csvContent = generateCSV(filteredData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Create a URL for the Blob object
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `project_visitors_${todayDate}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <>


            <div className="my-4 flex gap-2 w-full">
            <div className="my-4 flex gap-2 w-3/4">
                <div className='w-full rounded-lg border-2 p-4 border-green-400 text-green-400 bg-white'>
                    <h1 className='text-lg'>
                        Unique Visitors
                    </h1>
                    <h1 className='text-end text-3xl font-bold'>{uniqueIPCount}</h1>
                </div>
                <div className='w-full rounded-lg border-2 p-4 border-orange-400 text-orange-400 bg-white'>
                    <h1 className='text-lg'>
                        Returning Visitors
                    </h1>
                    <h1 className='text-end text-3xl font-bold'>{repeatIPCount}</h1>
                </div>
                <div className='w-full rounded-lg border-2 p-4 border-blue-400 text-blue-400 bg-white'>
                    <h1 className='text-lg'>
                        New Visitors (Today)
                    </h1>
                    <h1 className='text-end text-3xl font-bold'>{newVisitorCount}</h1>
                </div>
            </div>
            <div className="my-4 flex gap-2 w-1/4">
            <div className={`w-full justify-center justify-between flex rounded-lg border-2 p-4 border-amber-400  bg-white ${loadingCredits?'animate-pulse bg-amber-400 text-white':'text-amber-400'}`}>
                    <div>
                    <h1 className='text-lg'>
                        Available Credits
                    </h1>
                    <h1 className='text-start text-3xl font-bold'>{(credits?.credit)==null?0:(credits?.credit)}</h1>
                    </div>

    <AddCreditModal/>
                </div>
            </div>
            </div>
          

            <div style={{ marginBottom: '20px' }}>
                <label>
                    Filter by State:
                    <Select
                        isMulti
                        options={stateOptions}
                        value={selectedStates}
                        onChange={setSelectedStates}
                        placeholder="Select states"
                        style={{ width: '200px', marginLeft: '10px' }}
                    />
                </label>
                <label>
                    Filter by Zip Code:
                    <Select
                        isMulti
                        options={zipCodeOptions}
                        value={selectedZipCodes}
                        onChange={setSelectedZipCodes}
                        placeholder="Select zip codes"
                        style={{ width: '200px', marginLeft: '10px' }}
                    />
                </label>
            </div>

            <div className='flex justify-between' style={{ marginBottom: '20px' }}>
                <button
                    onClick={downloadCSV}
                    className="btn btn-primary"
                    style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Export as CSV
                </button>
                <ApiKeyModal />
            </div>

            {selectedRowCount > 0 && (
                <div className="mb-3 border bg-blue-100 py-3 px-3">
                    <p className="text-justify">
                        <strong>Selected Rows Count:</strong> <span className="text-end"> {selectedRowCount}</span>
                    </p>
                </div>
            )}

            <div className="mb-2">
                {selectedIPs.length > 0 && <EnrichModal selectedData={selectedIPs} availableCredits={credits?.credit} />}
            </div>

            {loading ? (
                <div className="flex w-full justify-center">
                    <img className="w-16" src={rolling} alt="" />
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleSelectedRowsChange}
                />
            )}
        </>
    );
};

export default TrafficTable;
