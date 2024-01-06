import('got').then((gotModule) => {
    const got = gotModule.default;
    const HTMLParser = require('node-html-parser');
    const prompt = require('prompt-sync')();
    const { Webhook, MessageBuilder } = require('discord-webhook-node');
    const hook = new Webhook("https://discord.com/api/webhooks/1150003911458033705/LUAqKPVTaKeIl8xUD2fd9NZDnxskgKe-pqgnDAxzB1B7ZF2bzciRG0y6mGo5WZ-EIZ6S");
     
    const embed = new MessageBuilder()
    //const productLink = "https://www.amazon.com/Apple-2023-MacBook-Laptop-chip/dp/B0C7686169/ref=sr_1_2?crid=3GB7X2TYPOH0E&keywords=macbook&qid=1694247315&sprefix=macbook%2Caps%2C155&sr=8-2&ufe=app_do%3Aamzn1.fos.ac578592-0362-4e0a-958c-0f2dd61d30d4&th=1";
    .setTitle('Monitor AMZ')
    .setTimestamp();


    async function monitor(productLink) {
        var requestHeaders = {
            'authority': 'www.amazon.com',
            'method': 'GET',
            'path': '/Apple-2023-MacBook-Laptop-chip/dp/B0C7686169/?_encoding=UTF8&pd_rd_w=XwdV2&content-id=amzn1.sym.5f7e0a27-49c0-47d3-80b2-fd9271d863ca%3Aamzn1.symc.e5c80209-769f-4ade-a325-2eaec14b8e0e&pf_rd_p=5f7e0a27-49c0-47d3-80b2-fd9271d863ca&pf_rd_r=DVTFT6SJEHF4B323NM5A&pd_rd_wg=IA87D&pd_rd_r=3fcc994b-9e65-4b1c-8f4d-ce6af756825d&ref_=pd_gw_ci_mcx_mr_hp_atf_m&th=1',
            'scheme': 'https',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'max-age=0',
            'Cookie': 'ubid-main=134-0786591-1523314; lc-main=en_US; x-main="EcHW9AN6389xie0cTYrGDP7virRqxXitZ2BnDKIuOu7JZLyD8Y??68x?FkmpBeyC"; at-main=Atza|IwEBIBj-wa1mGj4r_eCnCGS-Asv6Gk_l4eWGDX57ma65flLcYpIHzlg6xyeXTRzE9xnCLxVl2tHSG4yi7Qg__bmIvrMb-gN6M87uiiX7nKoAHU7bc4YvbLmSUVzz31bPPVctX8agpU8J8kT61w2NRgQJZpzEnKqNiJrsYLQZ4V4-7-eGJ7JEXKJlRlUdj3cVud68YPHWqzgQV35wQTySUJxl5Y4QuKTP6hKyIZRZ5mUBihAWW4j-_dxWxOX4Z8iKZMi-pIc3ukKyPrTnC6OwA59ubqP9xyFVXnf58jllPXZ3xM4uxw; sess-at-main="QPOquKQb78me3fkT+485ruIt1lYXxXSSk/bMg0EcYIA="; sst-main=Sst1|PQEKsEAqwKDPw5oAk1-W7cJlCakGwd0k-wlPlCdx5mG9LovNgy4cU6WuW11UuVEt2YBw3Z2TSSCr9-SXicuG2osgpgE3GcWruh9_-U_cyAtEv7raAxDImIFGRVGLpzH_FggkvLs-zPzTG5udngGQX2LaRqawG5G7VxS7ACrmjXn1g1DYS0ZsDCFWiaS1Xz6KraZrKhuJkd3p_JtDV-B-Wc6-CqgF8NOfTG4LuIKKT49DvS6vlUVlGEQKU1BNVp8Oi36A-K4mZwBvioLk8AE-4xiHipo9EVQetFUN5V-jRAbpmNY; i18n-prefs=USD; csd-key=eyJ3YXNtVGVzdGVkIjp0cnVlLCJ3YXNtQ29tcGF0aWJsZSI6dHJ1ZSwid2ViQ3J5cHRvVGVzdGVkIjpmYWxzZSwidiI6MSwia2lkIjoiNmU1ZmNiIiwia2V5IjoiTCtPaGhTNVdkYzBObXZENFlQbWFSNmZlLzZ3eG9yN24zZ3Y3UVhoQnZTY2FsRnZMRmpYcHGYbmdRXhTUnZ9jDvPxRfzrKzwA&sekIjoiTCtPaGhTNVdkYzBObXZENFlQbWFSNmZlLzZ3eG9yN24zZ3Y3UVhoQnZTY2FsRnZMRmpYcHGYbmdRXhTUnZ9jDvPxRfzrKzwA; s_vnum=2125528625512%26vn%3D1; s_nr=1693528627676-New; s_dslv=1693528627677; session-id-apay=137-4516183-5104505; session-id=132-7580331-5966607; session-id-time=2082787201l; skin=noskin; session-token=N+v2Npp/L63ZuGsyHHGjHDB9dPsrcS4KZgsdiOviWreVyLwlOoXtPgDP1tfAMncO+pg7bH+yN0aj95InJfdTFf+hS/G8IBnsrOCSZ6sr4nF+8t/y+zGIQV+FRep60vv/6++IJmYmmev7QMhsXZk84X1z2+5ldLQwsh3OSRH6bTrn0IOu1nsnkZinNNvVRJRGYjuI5j0MbMyXVgYQQrV+OJtRH+ZjY7ozxzC7h6boCs55FoQ+UyPnwaR4NA6riugzyR5+w97AeMyO9InyrOqDLDnxcRjE1XOD+1FXomjzuwNYb/Ol5l3Ienkyzo1Y0+xJpkY77pQ++z6MCfy6SxoIuuNuIHxQKGX/+FkUaio/FoUjaGkEEWUu0Rpu4tij7HQK; csm-hit=tb:s-D5RE60HMNN811YG01HCK|1694247713170&t:1694247715596&adb:adblk_yes',
            'Device-Memory': '8',
            'Downlink': '10',
            'Dpr': '1',
            'Ect': '4g',
            'Referer': 'https://www.amazon.com/ref=nav_logo',
            'Rtt': '50',
            'Sec-Ch-Device-Memory': '8',
            'Sec-Ch-Dpr': '1',
            'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Ch-Ua-Platform-Version': '"15.0.0"',
            'Sec-Ch-Viewport-Width': '1058',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            'Viewport-Width': '1058',
        }


        const response = await got(productLink, {
            headers: requestHeaders
        });


        if(response && response.statusCode == 200){
            let root = HTMLParser.parse(response.body);
            let availabilityDiv = root.querySelector('#availability');
            if(availabilityDiv){
                let productImage = root.querySelector('#landingImage').getAttribute('src');
                let productName = productLink.substring(productLink.indexOf('com/') + 4, productLink.indexOf('/dp'));
                let stockText = availabilityDiv.childNodes[1].innerText.toLowerCase();
                if (stockText =='out of stock'){
                    console.log(productName + ' is OUT OF STOCK');
                }else {
                    embed.setThumbnail(productImage);
                    embed.addField(productName, productLink, true);
                    embed.addField('Availability', 'IN STOCK', false);
                    hook.send(embed);
                    console.log (productName + ' is IN STOCK');
                }
               
            }
        }
        await new Promise(r => setTimeout(r, 10000));
        monitor(productLink);
        return false;
    }




    async function Run(){
        var productLink = prompt("Enter links to monitor (use comma): ");
        var productLinksArr = productLink.split(',');
        if(productLink.indexOf('http') >= 0){
            console.log('Now monitoring '  + productLink);
        }else {
            console.log('Error. Invalid URL');
        }


        var monitors = [];


        productLinksArr.forEach(link => {
            var p = new Promise((resolve, reject) =>{
                resolve(monitor(link));
            }).catch(err => console.log(err));
            monitors.push(p);
        })
        console.log('Monitoring ' + productLinksArr.length + ' items');


        await Promise.allSettled(monitors);
       
    }


    Run();


});