/*-------------------------------------------------------------------------------------------------
	Function: print()
	Purpose:  Logs Execution
-------------------------------------------------------------------------------------------------*/
function print(name, value){	

	var context        = nlapiGetContext();
	var usageRemaining = context.getRemainingUsage();
	nlapiLogExecution ('DEBUG', name + ' | ' + usageRemaining, value);
}
