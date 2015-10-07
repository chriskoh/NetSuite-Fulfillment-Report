function main(request, response)	// initial function called as default function in script
{	
	if(request.getMethod() == 'GET')	// as script is run
	{
		function2();
	}
	else								// after submit
	{
		//function2();
	}
}

function function1() 
{

	var form = nlapiCreateForm('Pending Billing Report');
	form.addField('date_start', 'date', 'Start Date').setDefaultValue('1/1/2015');
		
	form.addSubmitButton('Submit');
	response.writePage(form);

}
function function2() 
{
	
	// Create storage locations for data stored in file cabinet
	var soNumber = new Array();
	var soStatus = new Array();
	var soCDate = new Array();
	var soDDate = new Array();
	var soPayment = new Array();
	var soAmount = new Array();
	var soUBAmount = new Array();

	// Load Data from file cabinet
	var accfileTransferIn 						= nlapiLoadFile(441134);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soNumber 									= soNumber.concat(accountarrayTransferIn);
	
	var accfileTransferIn 						= nlapiLoadFile(441135);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soStatus 									= soStatus.concat(accountarrayTransferIn);
	
	var accfileTransferIn 						= nlapiLoadFile(441136);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soCDate 									= soCDate.concat(accountarrayTransferIn);
	
	var accfileTransferIn 						= nlapiLoadFile(441137);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soDDate 									= soDDate.concat(accountarrayTransferIn);
	
	var accfileTransferIn 						= nlapiLoadFile(441138);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soPayment 									= soPayment.concat(accountarrayTransferIn);
	
	var accfileTransferIn 						= nlapiLoadFile(441139);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soAmount 									= soAmount.concat(accountarrayTransferIn);
	
	var accfileTransferIn 						= nlapiLoadFile(441140);
	var accountfileTransferIn 					= accfileTransferIn.getValue();
	var accountarrayTransferIn 					= accountfileTransferIn.split(",");
	soUBAmount 									= soUBAmount.concat(accountarrayTransferIn);
			
	// Start HTML
	html  = '<html>';
	html += '<head>';
	html += '<link rel="stylesheet" type="text/css" href="https://system.netsuite.com/core/media/media.nl?id=441335&c=811217&h=fc41f521f3c4cfa0f504&_xt=.css">'; 
	html += '<script src="http://code.jquery.com/jquery-1.5.1.min.js" type="text/javascript"></script>';
	html += '<script src="https://system.netsuite.com/core/media/media.nl?id=420986&c=811217&h=4117b836519d6a473b55&_xt=.js" type="text/javascript"></script>';
	html += '<script src="https://system.netsuite.com/core/media/media.nl?id=2569299&c=449066&h=740ff277c48345befd44&_xt=.js"></script>';
	html += '</head>';
	html += '<body>';
	
	html += '<table class="sortable" id="datatable">' +
				'<tr id="myTRWhite">' +
					'<td id="myTDWhiteData"  align="center">Sales Order Number</td>' +
					'<td id="myTDWhiteData"  align="center">Status</td>' +
					'<td id="myTDWhiteData"  align="center">Sales Order Creation Date</td>' +
					'<td id="myTDWhiteData"  align="center">Date Fulfilled</td>' +
					'<td id="myTDWhiteData"  align="center">Fulfilled # of days later</td>' +
					'<td id="myTDWhiteData"  align="center">Credit Card Used</td>' +
					'<td id="myTDWhiteData"  align="center">Sales Order Amount</td>' +
					'<td id="myTDWhiteData"  align="center">Unbilled Amount</td>' +
				'</tr>';
	
	// variables for totals
	var totalSOA = Number(0);
	var totalUBA = Number(0);
	
	// variable for alternating colors in CSS
	var counter = 0;
	
	// print data for each SO
	for(var x = 0; x < soNumber.length; x++){
		
		// set TR / TD id for CSS
		if(counter %2 == 0){
			
			var trd = 'myTRWhite';
			var tdd = 'myTDWhiteData';
		}else{
			var trd = 'myTRBlue';
			var tdd = 'myTDBlueData';

		}
		
		// Set variable to be used for Payment Method based on internal id
		if(soPayment[x] == '7'){
			
			var pmt = 'PayPal';
		}else if(soPayment[x] == '4'){
			
			var pmt = 'MasterCard';
		}else if(soPayment[x] == '5'){
			
			var pmt = 'Visa';
		}else if(soPayment[x] == '6'){
			
			var pmt = 'American Express';
		}else if(soPayment[x] == '3'){
			
			var pmt = 'Discover';
		}
		
		// Calculate difference between SO / IF date
		var b = new Date(soDDate[x]);
		var a = new Date(soCDate[x]);
	    var msDay = 60*60*24*1000;
		var diff = Math.floor((b - a) / msDay);
			
		html += '<tr>' +
					'<td align="center">' + soNumber[x] + '</td>' + // SO Number
					'<td align="center">' + soStatus[x] + '</td>' + // Status
					'<td align="center">' + new Date(soCDate[x]).format('mm/dd/yyyy') + '</td>' + // SO Date
					'<td align="center">' + new Date(soDDate[x]).format('mm/dd/yyyy') + '</td>' + // fulfilled Date
					'<td align="center">' + diff + '</td>' + // Date difference
					'<td align="center">' + pmt + '</td>' + // Payment Method
					'<td align="center">$ ' + Number(soAmount[x]).toFixed(2) + '</td>' + // SO Amount
					'<td align="center">$ ' + Number(soUBAmount[x]).toFixed(2) + '</td>' + // unbilled Amount
				'</tr>';
		
		// add total to running total variable
		totalSOA += Number(soAmount[x]);
		totalUBA += Number(soUBAmount[x]);

		// counter used for alternating CSS 
		counter++;
	}
			// print total row
	html += 		'<tr>' +
						'<td  id="myTDWhiteDataz">-</td>' + // SO Number
						'<td  id="myTDWhiteDataz">-</td>' + // Status
						'<td  id="myTDWhiteDataz">-</td>' + // SO Date
						'<td  id="myTDWhiteDataz">-</td>' + // fulfilled Date
						'<td  id="myTDWhiteDataz">-</td>' + // Date difference
						'<td  id="myTDWhiteDataz">-</td>' + // Payment Method
						'<td  id="myTDWhiteDataz">$ ' + numberWithCommas(totalSOA.toFixed(2)) + '</td>' + // SO Amount
						'<td  id="myTDWhiteDataz">$ ' + numberWithCommas(totalUBA.toFixed(2)) + '</td>' + // Unbilled Amount
					'</tr>';
	
	html += '</table>';
	html += '</body>' +
			'</html>';
	
	var form2 = nlapiCreateForm('Credit Card/Paypal Fulfillment Report');

	var myInlineHtml = form2.addField('custpage_btn', 'inlinehtml');
	myInlineHtml.setDefaultValue(html);
	
	response.writePage(form2);

}
/*-------------------------------------------------------------------------------------------------
Function: dateFormat
Purpose:  Format Date
-------------------------------------------------------------------------------------------------*/
var dateFormat = function () {
    var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var    _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
