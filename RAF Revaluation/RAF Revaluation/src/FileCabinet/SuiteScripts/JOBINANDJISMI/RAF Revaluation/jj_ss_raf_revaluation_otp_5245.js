/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
/**************************************************************************************************************************************************
 * AUTHOR: Jobin and Jismi
 * 
 * OTP
 * 
 * Date Created: 04, January 2024
 * 
 * Created By: Abhincy Thomas
 * 
 * Description: This script is to send emails to sales rep about the sales orders on current date.
 * 
 * REVISION HISTORY.
 ************************************************************************************************************************************************** 
 */
define(['N/email', 'N/format', 'N/search'],
    /**
 * @param{email} email
 * @param{format} format
 * @param{search} search
 */
    (email, format, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try {
                let salesSearch = search.create({                           //search created for sales order to fetch the details
                    type: search.Type.SALES_ORDER,
                    filters: [['trandate', 'on', 'today'], 'AND', ["mainline", "is", "T"]],
                    columns: ["entity",
                        search.createColumn({
                            name: "salesrep",
                            join: "customerMain",
                            sort: search.Sort.ASC,
                        }),
                        search.createColumn({
                            name: "supervisor",
                            join: "salesRep",
                        }),
                        "tranid",
                        "trandate",
                        "amount"
                    ]
                });
                log.debug('search', salesSearch);
                let len = salesSearch.run().getRange({
                    start:0,
                    end:1000
                });
                let salesRep, customer= [], supervisor, doc=[], amount=[], date=[], rep;
                len.forEach(function (result, index) {
                    
                        salesRep = result.getValue({
                            name: "salesrep",
                            join: "customerMain",
                            sort: search.Sort.ASC,
                        });
                        log.debug('rep', salesRep);
                        customer[index] = result.getText({
                            name: "entity"
                        });
                        log.debug('cus', customer);
                        supervisor= result.getValue({
                            name: "supervisor",
                            join: "salesRep",
                        });
                        log.debug('sup', supervisor);
                        doc[index] = result.getValue({
                            name: "tranid"
                        });
                        log.debug('tran id', doc);
                        date [index]= result.getValue({
                            name: "trandate"
                        });
                        log.debug('tran date', date);
                        amount[index] = result.getValue({
                            name: "amount"
                        });
                        let html = "<table>"+
                            "<tbody>"+
                                "<tr>"+
                                    "<th>|Document Number|</th>"+
                                    "<th>Customer Name  |</th>"+
                                   " <th>Date           |</th>"+
                                    "<th>Amount         |</th>"+
                                "</tr>"+
                                "<tr>"+
                                   " <td>|" +doc[index]+">      |</td>"+
                                    "<td>"+customer[index]+"   |</td>"+
                                    "<td>"+date[index]+"       |</td>"+
                                    "<td>"+amount[index]+"     |</td>"+
                                "</tr>"+
                            "</tbody>"+
                       "</table>";
                        log.debug('amount', amount);
                        
                        if (salesRep != rep) {
                            rep = salesRep;
                            //  = salesRep[i].value;
                            log.debug('rep', rep);
                            if (supervisor != null) {
                                email.send({
                                    author: supervisor,
                                    body: html,
                                    recipients: salesRep,
                                    subject: 'Kindly review your sales order' + date
                                })
                            }
                            else {
                                email.send({
                                    author: -5,
                                    body: html,
                                    recipients: salesRep,
                                    subject: 'Kindly review your sales order' + date
                                })
                            }
    
                        }
                       
                                     //run the search to get the values as well as send emails.
                    
                    
                    log.debug('i', i);
                    return true;

                })
            }
            catch (e) {
                log.error('error', e.message);
            }

        }

        return { execute }

    });
