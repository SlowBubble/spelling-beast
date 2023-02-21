(function () {
    'use strict';

    const mainDiv = document.getElementById('main');
    const topDiv = document.getElementById('top');
    // @ts-ignore
    main(annyang);
    function main(annyang) {
        const microphoneToggle = document.createElement('button');
        microphoneToggle.textContent = 'Start/Pause';
        microphoneToggle.onclick = _ => {
            toggleMicrophone();
        };
        topDiv.appendChild(microphoneToggle);
        let microphoneIsOn = false;
        function toggleMicrophone() {
            if (microphoneIsOn) {
                annyang.abort();
                microphoneToggle.textContent = 'Start';
                microphoneToggle.style.background = 'limegreen';
            }
            else {
                annyang.start();
                microphoneToggle.textContent = 'Pause';
                microphoneToggle.style.background = 'salmon';
            }
            microphoneIsOn = !microphoneIsOn;
        }
        const commands = {
            'show me *query': showImage,
        };
        // Add our commands to annyang
        annyang.addCommands(commands);
        // Start listening.
        toggleMicrophone();
        console.log('annyang loaded');
    }
    async function showImage(query) {
        console.log('fetching: ', query);
        const url = `https://www.bing.com/images/search?q=${query}`;
        // const url = `https://www.google.com/search?q=${query}&tbm=isch`
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const urlWithProxy = corsProxyUrl + url;
        console.log('Succeeded with CORS proxy.');
        let resp;
        resp = await fetch(urlWithProxy);
        const html = await resp.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const body = doc.querySelector('body');
        if (!body) {
            return;
        }
        const topImages = getImages(body);
        console.log(topImages);
        if (!topImages || topImages.length === 0) {
            return;
        }
        const topImage = topImages[0];
        const width0 = topImage.width;
        const height0 = topImage.height;
        topImage.width = 700;
        if (height0 > 0 && width0 > 0) {
            topImage.height = topImage.width * height0 / width0;
        }
        mainDiv.innerHTML = '';
        mainDiv.appendChild(topImage);
    }
    // function getImageLinks(body: HTMLBodyElement): Array<string> | undefined {
    //   const headings = Array.from(body.querySelectorAll('h1'));
    //   const resultsHeading = headings.find(heading => heading.textContent?.toLowerCase().includes('results'));
    //   if (!resultsHeading) {
    //     console.log('Unable to find Search Results heading')
    //     return;
    //   }
    //   let possImagesContainerElt = resultsHeading.nextSibling;
    //   while (possImagesContainerElt) {
    //     // @ts-ignore
    //     const possLinks = possImagesContainerElt.querySelectorAll('a');
    //     if (possLinks) {
    //       const anchorList: Array<HTMLAnchorElement> = Array.from(possLinks);
    //       const links = anchorList.map(anchor => anchor.href);//.filter(href => href.includes('imgurl='));
    //       console.log(links);
    //       return;
    //     }
    //     possImagesContainerElt = possImagesContainerElt.nextSibling;
    //   }
    //   return;
    // }
    function getImages(body) {
        const imgs = body.querySelectorAll('.mimg');
        if (!imgs) {
            console.log('Unable to find images');
            return;
        }
        const imgArr = Array.from(imgs);
        return imgArr.filter(elt => elt.src && elt.src.startsWith('http'));
    }

})();
//# sourceMappingURL=webMain.js.map
