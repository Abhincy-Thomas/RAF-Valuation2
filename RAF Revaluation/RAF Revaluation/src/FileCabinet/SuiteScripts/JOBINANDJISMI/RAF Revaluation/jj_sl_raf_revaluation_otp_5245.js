/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
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
 * Description: This script is to create a custom suitelet form for listing the Shows.
 * 
 * REVISION HISTORY.
 ************************************************************************************************************************************************** 
 */
define(['N/https', 'N/ui/serverWidget', 'N/url'],
    /**
 * @param{https} https
 * @param{serverWidget} serverWidget
 * @param{url} url
 */
    (https, serverWidget, url) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {
                if (scriptContext.request.method === 'GET') {
                    let form = serverWidget.createForm({              // form creation
                        title: 'TV show details'
                    });
                    let show = form.addField({
                        id: 'showname',
                        label: 'Show Name',
                        type: serverWidget.FieldType.TEXT
                    });
                    log.debug('show',show);

                    form.clientScriptFileId = 3340;     // 

                    show.defaultValue = scriptContext.request.parameters.showV;

                    let button = form.addButton({                       //button when clicke, the function will be triggered.
                        id: 'searchshows',
                        label: 'search shows',
                        functionName: fetchingData(show.defaultValue)
                    });

                    log.debug('button', button);
                    let sublist = form.addSublist({       // sublist creation
                        id: 'showsublist',
                        label: 'Result',
                        type: serverWidget.SublistType.LIST
                    });
                    sublist.addField({
                        id: 'name',
                        label: 'Name',
                        type: serverWidget.FieldType.TEXT
                    });
                    sublist.addField({
                        id: 'type',
                        label: 'Type',
                        type: serverWidget.FieldType.TEXT
                    });
                    sublist.addField({
                        id: 'language',
                        label: 'Language',
                        type: serverWidget.FieldType.TEXT
                    });
                    sublist.addField({
                        id: 'url',
                        label: 'URL',
                        type: serverWidget.FieldType.URL
                    });

        


                    scriptContext.response.writePage(form);

                }

                // const searchQuery = scriptContext.response.showname; // Replace 'The Office' with the name of the show you want to search for

            }
            catch (e) {
                log.debug('error', e.message);
            }

        }
        function fetchingData(show) {             //function to trigger when the button in suitelet form is clicked.
            // let searchQuery = show;
            // fetch(`http://api.tvmaze.com/search/shows?q=${searchQuery}&apikey=${apiKey}`).then((response) => response.json()).then((data) => log.debug('data',data)).catch((error) => console.log(error));    // this piece of code is used to fetch the details of the show by passing it through the url.
            


        }

        return { onRequest }

    });
