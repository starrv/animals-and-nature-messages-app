import Image from 'next/image';

export default function MessageContent({content}:{content:string}){
    //format the email message so it is clear which data represents the text and images
    function parseContent(content:string){
        //look at String.prototype.match method
        const regex=/boundary=.*/gm
        const boundaries=content.match(regex);
        if(boundaries?.length==0){
            return {plain:"",html:"",image:""};
        }
        else{
            let i=0;
            const finalContents={plain:"",html:"",image:""};
            while(boundaries?.length && i<boundaries?.length){
                const boundaryDetails=boundaries[i].split("=");
                const parsedBoundary=boundaryDetails[2].replaceAll('"','');
                const relevantContents=content.split(parsedBoundary);
                relevantContents.forEach((relevantContent:string)=>{
                    if(relevantContent.toLowerCase().includes("content-transfer-encoding: base64")){
                        if(i<boundaries.length-1 && relevantContent.includes(boundaries[i+1])){
                            const parsedSecondaryBoundary=boundaries[i+1].replaceAll('"','').split("=")[1];
                            const secondaryRelevantContents=relevantContent.split(parsedSecondaryBoundary);
                            secondaryRelevantContents.forEach(secondaryRelevantContent=>{
                                if(secondaryRelevantContent.toLowerCase().includes("content-transfer-encoding: base64")){
                                    if(secondaryRelevantContent.toLowerCase().includes('content-type: text/plain')){
                                        finalContents.plain=secondaryRelevantContent.split("\r\n\r\n")[1];
                                    }
                                    else if(secondaryRelevantContent.toLowerCase().includes('content-type: text/html')){
                                        finalContents.html=secondaryRelevantContent.split("\r\n\r\n")[1];
                                    }
                                    else{
                                        finalContents.image=secondaryRelevantContent.split("\r\n\r\n")[1];
                                    }
                                }
                            });
                            i++;
                        }
                        else{
                            if(relevantContent.toLowerCase().includes('content-type: text/plain')){
                                finalContents.plain=relevantContent.split("\r\n\r\n")[1];
                            }
                            else if(relevantContent.toLowerCase().includes('content-type: text/html')){
                                finalContents.html=relevantContent.split("\r\n\r\n")[1];
                            }
                            else{
                                finalContents.image=relevantContent.split("\r\n\r\n")[1];
                            }
                        }
                    }
                });
                i++;
            }
            return finalContents;
        }
    }

    const parsedContents=parseContent(content);
    const text=parsedContents?.plain;
    const image=parsedContents?.image;
    
    return(
        <div className="message-content">
            {text ? <p>{atob(text)}</p> : "<p className='error-msg'>An error has occurred.  Please contact IT Support</p>"}
            {(text && image) ? <Image  width="250" height="250" placeholder={`data:image/png;base64,${image}`} src={`data:image/png;base64,${image}`} blurDataURL={`data:image/png;base64,${image}`} alt="user supplied image" /> : null}
        </div>
    );
}