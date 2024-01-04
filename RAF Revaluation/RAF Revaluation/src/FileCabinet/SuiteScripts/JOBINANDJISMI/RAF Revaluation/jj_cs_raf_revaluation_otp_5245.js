/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/***************************************************************************************************************************************************
 * AUTHOR: Jobin and Jismi
 * 
 * OTP
 * 
 * Date Created: 04, January 2024
 * 
 * Created By: Abhincy Thomas
 * 
 * Description: This script is to identify the change in the search field in suitelet form.
 * 
 * REVISION HISTORY.
 ************************************************************************************************************************************************** 
 */
define(['N/runtime', 'N/url'],
/**
 * @param{runtime} runtime
 * @param{url} url
 */
function(runtime, url) {
    
    // /**
    //  * Function to be executed after page is initialized.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
    //  *
    //  * @since 2015.2
    //  */
   
    // function pageInit(scriptContext) {
         
    // }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        if(scriptContext.fieldId == "showname"){  // The show name entered will be recognised here ath the value is given to suitelet 
            let show = scriptContext.currentRecord.getValue({
                fieldId: 'showname'
            });
            if(show){
                document.location = url.resolveScript({
                    scriptId: 'customscript_jj_sl_raf_revaluation',
                    deploymentId: 'customdeploy_jj_sl_raf_revaluation',
                    params: {
                        'showV': show
                    }
                });
            }
        }
    }

   
    return {
        // pageInit: pageInit,
        fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        // saveRecord: saveRecord
    };
    
});
