function function1() 
{
	var setStartDate = new Date(2015,0,1);
	
	var trandateArray = new Array();
	var statusArray = new Array();
	var tranidArray = new Array();
	var entityArray = new Array();
	var datecreatedArray = new Array();
	var amountArray = new Array();
	var amounbilledArray = new Array();
	var amountremainingArray = new Array();
	var paymentmethodArray = new Array();
	var createdfromArray = new Array();

	// Search for Sales Order information
	var filters = new Array();
	filters[0]  = new nlobjSearchFilter('type', null, 'is', 'SalesOrd');
	filters[1]  = new nlobjSearchFilter('taxline', null, 'is', 'F');
	filters[2]  = new nlobjSearchFilter('shipping', null, 'is', 'F');
	filters[3]  = new nlobjSearchFilter('status', null, 'noneof', ['SalesOrd:C', 'SalesOrd:A', 'SalesOrd:H']);
	filters[4]  = new nlobjSearchFilter('mainline', null, 'is', 'T');
	filters[5]  = new nlobjSearchFilter('trandate', null, 'onorafter', setStartDate);

	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid').setSort();
	columns[1] = new nlobjSearchColumn('line');
	columns[2] = new nlobjSearchColumn('trandate'); 				
	columns[3] = new nlobjSearchColumn('statusref'); 						
	columns[4] = new nlobjSearchColumn('tranid'); 						
	columns[5] = new nlobjSearchColumn('entity'); 						
	columns[6] = new nlobjSearchColumn('datecreated'); 
	columns[7] = new nlobjSearchColumn('amount'); 									
	columns[8] = new nlobjSearchColumn('amountunbilled'); 									
	columns[9] = new nlobjSearchColumn('amountremaining'); 									
	columns[10] = new nlobjSearchColumn('paymentmethod'); 		
	columns[11] = new nlobjSearchColumn('createdfrom'); 									


	// Search results #0-999
	var results = nlapiSearchRecord('transaction', null, filters, columns);	
	print('results check', results.length);

	// Storage location for complete result set.
	var allResults = new Array();
	allResults = allResults.concat(results);
		
	// Search results #1000+
	while(results.length == 1000)
	{
		var lastId2 = results[999].getValue('internalid');
		var lastLine = results[999].getValue('line');
		
		filters[6] = new nlobjSearchFilter('internalidNumber', null, 'greaterthanorequalto', lastId2);
	
		var results = nlapiSearchRecord('transaction', null, filters, columns);
		
        for(var i = 0; i < results.length; i++){
        	
              var result = results[i];

              if(Number(result.getValue('internalid')) == Number(lastId2) && Number(result.getValue('line')) > Number(lastLine)){

            	  allResults = allResults.concat(result); 
              }
              else if(result.getValue('internalid') > lastId2){
                	  
                  allResults = allResults.concat(result); 
              }
        }
        
    	print('results check', results.length + ' -> ' + allResults.length);

    	
	}

	// Set search results in to arrays to be posted in to the file cabinet
	for(var x2 = 0; x2 < allResults.length; x2++){
		
		result = allResults[x2];
		
		if(result.getValue('amount') != ''){
			
			trandateArray = trandateArray.concat(result.getValue('trandate'));
			statusArray = statusArray.concat(result.getValue('statusref'));
			tranidArray = tranidArray.concat(result.getValue('tranid'));
	        var str1 = result.getText('entity');
	        var str2 = str1.replace(/\,/g,"");
			entityArray = entityArray.concat(str2);			
			datecreatedArray = datecreatedArray.concat(result.getValue('datecreated'));
			amountArray = amountArray.concat(result.getValue('amount'));
			amounbilledArray = amounbilledArray.concat(result.getValue('amountunbilled'));
			amountremainingArray = amountremainingArray.concat(result.getValue('amountremaining'));
			paymentmethodArray = paymentmethodArray.concat(result.getValue('paymentmethod'));
			createdfromArray = createdfromArray.concat(result.getText('createdfrom'));
		}
	}
	
	// Send results to file cabinet
	var trandateFile = nlapiCreateFile('SO trandate.txt', 'PLAINTEXT', trandateArray);
	trandateFile.setFolder(363770);
	nlapiSubmitFile(trandateFile);
	
	var typeFile = nlapiCreateFile('SO status.txt', 'PLAINTEXT', statusArray);
	typeFile.setFolder(363770);
	nlapiSubmitFile(typeFile);
	
	var accountFile = nlapiCreateFile('SO tranid.txt', 'PLAINTEXT', tranidArray);
	accountFile.setFolder(363770);
	nlapiSubmitFile(accountFile);
	
	var amountFile = nlapiCreateFile('SO entity.txt', 'PLAINTEXT', entityArray);
	amountFile.setFolder(363770);
	nlapiSubmitFile(amountFile);
	
	var statusrefFile = nlapiCreateFile('SO datecreated.txt', 'PLAINTEXT', datecreatedArray);
	statusrefFile.setFolder(363770);
	nlapiSubmitFile(statusrefFile);
	
	var statusrefFile = nlapiCreateFile('SO amount.txt', 'PLAINTEXT', amountArray);
	statusrefFile.setFolder(363770);
	nlapiSubmitFile(statusrefFile);
	
	var statusrefFile = nlapiCreateFile('SO amountunbilled.txt', 'PLAINTEXT', amounbilledArray);
	statusrefFile.setFolder(363770);
	nlapiSubmitFile(statusrefFile);
	
	var statusrefFile = nlapiCreateFile('SO amountremaining.txt', 'PLAINTEXT', amountremainingArray);
	statusrefFile.setFolder(363770);
	nlapiSubmitFile(statusrefFile);
	
	var statusrefFile = nlapiCreateFile('SO paymentmethod.txt', 'PLAINTEXT', paymentmethodArray);
	statusrefFile.setFolder(363770);
	nlapiSubmitFile(statusrefFile);
	
	var statusrefFile = nlapiCreateFile('SO createdfrom.txt', 'PLAINTEXT', createdfromArray);
	statusrefFile.setFolder(363770);
	nlapiSubmitFile(statusrefFile);
}
