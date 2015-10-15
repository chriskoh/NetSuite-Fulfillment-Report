function main(){
	
	// Create storage locations for data stored in file cabinet
	var soNumber = new Array();
	var soStatus = new Array();
	var soCDate = new Array();
	var soDDate = new Array();
	var soPayment = new Array();
	var soAmount = new Array();
	var soUBAmount = new Array();

	// Load Data from file cabinet
	var accfileTransferIn 			= nlapiLoadFile(441134);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soNumber 				= soNumber.concat(accountarrayTransferIn);
	
	var accfileTransferIn 			= nlapiLoadFile(441135);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soStatus 				= soStatus.concat(accountarrayTransferIn);
	
	var accfileTransferIn 			= nlapiLoadFile(441136);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soCDate 				= soCDate.concat(accountarrayTransferIn);
	
	var accfileTransferIn 			= nlapiLoadFile(441137);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soDDate 				= soDDate.concat(accountarrayTransferIn);
	
	var accfileTransferIn 			= nlapiLoadFile(441138);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soPayment 				= soPayment.concat(accountarrayTransferIn);
	
	var accfileTransferIn 			= nlapiLoadFile(441139);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soAmount 				= soAmount.concat(accountarrayTransferIn);
	
	var accfileTransferIn 			= nlapiLoadFile(441140);
	var accountfileTransferIn 		= accfileTransferIn.getValue();
	var accountarrayTransferIn 		= accountfileTransferIn.split(",");
	soUBAmount 				= soUBAmount.concat(accountarrayTransferIn);
			
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
				'<td id="myTDWhiteData" align="center">Sales Order Number</td>' +
				'<td id="myTDWhiteData" align="center">Status</td>' +
				'<td id="myTDWhiteData" align="center">Sales Order Creation Date</td>' +
				'<td id="myTDWhiteData" align="center">Date Fulfilled</td>' +
				'<td id="myTDWhiteData" align="center">Fulfilled # of days later</td>' +
				'<td id="myTDWhiteData" align="center">Credit Card Used</td>' +
				'<td id="myTDWhiteData" align="center">Sales Order Amount</td>' +
				'<td id="myTDWhiteData" align="center">Unbilled Amount</td>' +
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
	html += 	'<tr>' +
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
