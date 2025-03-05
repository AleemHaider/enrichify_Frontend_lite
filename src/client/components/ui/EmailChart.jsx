import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const EmailChart = ({ heading, color }) => {
    const navigate = useNavigate()
    const [mailOpen, setMailOpen] = useState()
    const data = useSelector(state => state.dashboardReducer.getDashboard.data)

    const mails = [
        {
            "id": "1",
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "template_id_fk": "18",
            "from_email": "usamavirtualsoftcompany@gmail.com",
            "to_email": "aleemhaider111@gmail.com",
            "status": "send",
            "created_at": "2025-02-26 07:10:02",
            "subject": "enrichment api call ",
            "body": "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>2019 Jeep Grand Cherokee Limited 4WD - Available Now!</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n        }\n        .container {\n            max-width: 600px;\n            margin: 20px auto;\n            background: #ffffff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 0 10px rgba(0,0,0,0.1);\n        }\n        .header {\n            text-align: center;\n        }\n        .header h2 {\n            color: #333;\n            margin-bottom: 10px;\n        }\n        .header p {\n            color: #555;\n            font-size: 16px;\n            margin-bottom: 20px;\n        }\n        .image-container {\n            text-align: center;\n        }\n        .image-container img {\n            width: 100%;\n            max-width: 500px;\n            border-radius: 8px;\n        }\n        .content {\n            padding: 20px 0;\n        }\n        .content h3 {\n            color: #333;\n        }\n        .content ul {\n            color: #555;\n            font-size: 16px;\n            padding-left: 20px;\n        }\n        .cta {\n            text-align: center;\n            padding-top: 20px;\n        }\n        .cta a {\n            display: inline-block;\n            background-color: #007BFF;\n            color: #ffffff;\n            padding: 12px 20px;\n            text-decoration: none;\n            border-radius: 5px;\n            font-size: 16px;\n            font-weight: bold;\n        }\n        .cta a:hover {\n            background-color: #0056b3;\n        }\n        .contact {\n            text-align: center;\n            font-size: 16px;\n            color: #555;\n            margin-top: 20px;\n        }\n        .contact a {\n            color: #007BFF;\n            text-decoration: none;\n        }\n    </style>\n</head>\n<body>\n\n    <div class=\"container\">\n        <!-- Header Section -->\n        <div class=\"header\">\n            <h2>2019 Jeep Grand Cherokee Limited 4WD</h2>\n            <p>Now available at York Chrysler Dodge Jeep Ram of Plainfield</p>\n        </div>\n\n        <!-- Vehicle Image -->\n        <div class=\"image-container\">\n            <img src=\"https://tse2.mm.bing.net/th?id=OIP.kk3hZ5nLou_stmISyU2EyQHaFj&pid=Api\" \n                 alt=\"2019 Jeep Grand Cherokee Limited\">\n        </div>\n\n        <!-- Vehicle Features -->\n        <div class=\"content\">\n            <h3>Key Features:</h3>\n            <ul>\n                <li><strong>Engine:</strong> 3.6L V6 with 295 HP</li>\n                <li><strong>Transmission:</strong> 8-speed automatic</li>\n                <li><strong>Fuel Efficiency:</strong> 21 MPG combined</li>\n                <li><strong>Interior:</strong> Leather seats, heated front & rear seats</li>\n                <li><strong>Technology:</strong> 8.4-inch touchscreen, Bluetooth, Navigation</li>\n                <li><strong>Safety:</strong> Rearview camera, blind-spot monitoring</li>\n            </ul>\n        </div>\n\n        <!-- Call-To-Action Button -->\n        <div class=\"cta\">\n            <a href=\"https://www.yorkcdjrofplainfield.com/inventory/used-2019-jeep-grand-cherokee-limited-4wd-4d-sport-utility-1c4rjfbg8kc648107/\">\n                View Listing\n            </a>\n        </div>\n\n        <!-- Contact Information -->\n        <div class=\"contact\">\n            <p><strong>York Chrysler Dodge Jeep Ram of Plainfield</strong><br>\n            2695 E Main St, Plainfield, IN 46168<br>\n            Sales: <a href=\"tel:3174343524\">(317) 434-3524</a><br>\n            Website: <a href=\"https://www.yorkcdjrofplainfield.com/\">Visit Here</a></p>\n        </div>\n    </div>\n\n</body>\n</html>\n"
        },
        {
            "id": "2",
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "template_id_fk": "18",
            "from_email": "usamavirtualsoftcompany@gmail.com",
            "to_email": "muhammadusamat86@gmail.com",
            "status": "send",
            "created_at": "2025-02-26 07:10:53",
            "subject": "enrichment api call ",
            "body": "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>2019 Jeep Grand Cherokee Limited 4WD - Available Now!</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n        }\n        .container {\n            max-width: 600px;\n            margin: 20px auto;\n            background: #ffffff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 0 10px rgba(0,0,0,0.1);\n        }\n        .header {\n            text-align: center;\n        }\n        .header h2 {\n            color: #333;\n            margin-bottom: 10px;\n        }\n        .header p {\n            color: #555;\n            font-size: 16px;\n            margin-bottom: 20px;\n        }\n        .image-container {\n            text-align: center;\n        }\n        .image-container img {\n            width: 100%;\n            max-width: 500px;\n            border-radius: 8px;\n        }\n        .content {\n            padding: 20px 0;\n        }\n        .content h3 {\n            color: #333;\n        }\n        .content ul {\n            color: #555;\n            font-size: 16px;\n            padding-left: 20px;\n        }\n        .cta {\n            text-align: center;\n            padding-top: 20px;\n        }\n        .cta a {\n            display: inline-block;\n            background-color: #007BFF;\n            color: #ffffff;\n            padding: 12px 20px;\n            text-decoration: none;\n            border-radius: 5px;\n            font-size: 16px;\n            font-weight: bold;\n        }\n        .cta a:hover {\n            background-color: #0056b3;\n        }\n        .contact {\n            text-align: center;\n            font-size: 16px;\n            color: #555;\n            margin-top: 20px;\n        }\n        .contact a {\n            color: #007BFF;\n            text-decoration: none;\n        }\n    </style>\n</head>\n<body>\n\n    <div class=\"container\">\n        <!-- Header Section -->\n        <div class=\"header\">\n            <h2>2019 Jeep Grand Cherokee Limited 4WD</h2>\n            <p>Now available at York Chrysler Dodge Jeep Ram of Plainfield</p>\n        </div>\n\n        <!-- Vehicle Image -->\n        <div class=\"image-container\">\n            <img src=\"https://tse2.mm.bing.net/th?id=OIP.kk3hZ5nLou_stmISyU2EyQHaFj&pid=Api\" \n                 alt=\"2019 Jeep Grand Cherokee Limited\">\n        </div>\n\n        <!-- Vehicle Features -->\n        <div class=\"content\">\n            <h3>Key Features:</h3>\n            <ul>\n                <li><strong>Engine:</strong> 3.6L V6 with 295 HP</li>\n                <li><strong>Transmission:</strong> 8-speed automatic</li>\n                <li><strong>Fuel Efficiency:</strong> 21 MPG combined</li>\n                <li><strong>Interior:</strong> Leather seats, heated front & rear seats</li>\n                <li><strong>Technology:</strong> 8.4-inch touchscreen, Bluetooth, Navigation</li>\n                <li><strong>Safety:</strong> Rearview camera, blind-spot monitoring</li>\n            </ul>\n        </div>\n\n        <!-- Call-To-Action Button -->\n        <div class=\"cta\">\n            <a href=\"https://www.yorkcdjrofplainfield.com/inventory/used-2019-jeep-grand-cherokee-limited-4wd-4d-sport-utility-1c4rjfbg8kc648107/\">\n                View Listing\n            </a>\n        </div>\n\n        <!-- Contact Information -->\n        <div class=\"contact\">\n            <p><strong>York Chrysler Dodge Jeep Ram of Plainfield</strong><br>\n            2695 E Main St, Plainfield, IN 46168<br>\n            Sales: <a href=\"tel:3174343524\">(317) 434-3524</a><br>\n            Website: <a href=\"https://www.yorkcdjrofplainfield.com/\">Visit Here</a></p>\n        </div>\n    </div>\n\n</body>\n</html>\n"
        },
        {
            "id": "3",
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "template_id_fk": "18",
            "from_email": "usamavirtualsoftcompany@gmail.com",
            "to_email": "aleemhaider111@gmail.com",
            "status": "send",
            "created_at": "2025-02-26 07:56:38",
            "subject": "enrichment api call ",
            "body": "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>2019 Jeep Grand Cherokee Limited 4WD - Available Now!</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n        }\n        .container {\n            max-width: 600px;\n            margin: 20px auto;\n            background: #ffffff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 0 10px rgba(0,0,0,0.1);\n        }\n        .header {\n            text-align: center;\n        }\n        .header h2 {\n            color: #333;\n            margin-bottom: 10px;\n        }\n        .header p {\n            color: #555;\n            font-size: 16px;\n            margin-bottom: 20px;\n        }\n        .image-container {\n            text-align: center;\n        }\n        .image-container img {\n            width: 100%;\n            max-width: 500px;\n            border-radius: 8px;\n        }\n        .content {\n            padding: 20px 0;\n        }\n        .content h3 {\n            color: #333;\n        }\n        .content ul {\n            color: #555;\n            font-size: 16px;\n            padding-left: 20px;\n        }\n        .cta {\n            text-align: center;\n            padding-top: 20px;\n        }\n        .cta a {\n            display: inline-block;\n            background-color: #007BFF;\n            color: #ffffff;\n            padding: 12px 20px;\n            text-decoration: none;\n            border-radius: 5px;\n            font-size: 16px;\n            font-weight: bold;\n        }\n        .cta a:hover {\n            background-color: #0056b3;\n        }\n        .contact {\n            text-align: center;\n            font-size: 16px;\n            color: #555;\n            margin-top: 20px;\n        }\n        .contact a {\n            color: #007BFF;\n            text-decoration: none;\n        }\n    </style>\n</head>\n<body>\n\n    <div class=\"container\">\n        <!-- Header Section -->\n        <div class=\"header\">\n            <h2>2019 Jeep Grand Cherokee Limited 4WD</h2>\n            <p>Now available at York Chrysler Dodge Jeep Ram of Plainfield</p>\n        </div>\n\n        <!-- Vehicle Image -->\n        <div class=\"image-container\">\n            <img src=\"https://tse2.mm.bing.net/th?id=OIP.kk3hZ5nLou_stmISyU2EyQHaFj&pid=Api\" \n                 alt=\"2019 Jeep Grand Cherokee Limited\">\n        </div>\n\n        <!-- Vehicle Features -->\n        <div class=\"content\">\n            <h3>Key Features:</h3>\n            <ul>\n                <li><strong>Engine:</strong> 3.6L V6 with 295 HP</li>\n                <li><strong>Transmission:</strong> 8-speed automatic</li>\n                <li><strong>Fuel Efficiency:</strong> 21 MPG combined</li>\n                <li><strong>Interior:</strong> Leather seats, heated front & rear seats</li>\n                <li><strong>Technology:</strong> 8.4-inch touchscreen, Bluetooth, Navigation</li>\n                <li><strong>Safety:</strong> Rearview camera, blind-spot monitoring</li>\n            </ul>\n        </div>\n\n        <!-- Call-To-Action Button -->\n        <div class=\"cta\">\n            <a href=\"https://www.yorkcdjrofplainfield.com/inventory/used-2019-jeep-grand-cherokee-limited-4wd-4d-sport-utility-1c4rjfbg8kc648107/\">\n                View Listing\n            </a>\n        </div>\n\n        <!-- Contact Information -->\n        <div class=\"contact\">\n            <p><strong>York Chrysler Dodge Jeep Ram of Plainfield</strong><br>\n            2695 E Main St, Plainfield, IN 46168<br>\n            Sales: <a href=\"tel:3174343524\">(317) 434-3524</a><br>\n            Website: <a href=\"https://www.yorkcdjrofplainfield.com/\">Visit Here</a></p>\n        </div>\n    </div>\n\n</body>\n</html>\n"
        }
    ]

    useEffect(() => {
        const countEmailsPerDay = () => {
            const dateCounts = {};

            data?.mail_data?.forEach((entry) => {
                // mails?.forEach((entry) => {
                const date = moment(entry.created_at).format("YYYY-MM-DD");
                dateCounts[date] = (dateCounts[date] || 0) + 1;
            });

            const formattedData = Object.keys(dateCounts).map((date) => ({
                date,
                count: dateCounts[date],
            }));

            setMailOpen(formattedData);
        };

        countEmailsPerDay();
    }, [data]);
    console.log("mailOpen: ", mailOpen);


    const dat = [
        { name: 'Page A', uv: 500, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 900, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 500, pv: 2600, amt: 2100 },
        { name: 'Page A', uv: 600, pv: 2700, amt: 2400 },
    ];
    return (
        <div className='w-full'>
            <div className="flex justify-between items-center my-4">
                <h1 className='text-base font-semibold text-[#333B69]'>{heading}</h1>
                <p onClick={() => navigate("emailDetails")} className='text-sm font- text-[#8A8A8A] cursor-pointer'>view details</p>
            </div>
            <div className='bg-white rounded-3xl w-[600px w-auto h-[300px p-3 pt-6'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mailOpen} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="count" stroke={color} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default EmailChart