// ;(() => {
//   let contentLoaded = false

//   const copyToClipboard = (text) => {
//     const tempTextarea = document.createElement("textarea")
//     tempTextarea.value = text
//     tempTextarea.style.position = "absolute"
//     tempTextarea.style.left = "-9999px"
//     document.body.appendChild(tempTextarea)
//     tempTextarea.select()
//     document.execCommand("copy")
//     document.body.removeChild(tempTextarea)
//   }

//   const addCopyButton = () => {
//     document.querySelectorAll(".markdown").forEach((item, index) => {

//       const button = document.createElement("button")
//       const svgString =
//         '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 115.77 122.88" style="enable-background:new 0 0 115.77 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/></g></svg>'
//       button.className = "absolute top-0 right-0 w-[30px] h-[30px]"
//       const parser = new DOMParser()
//       const svgDoc = parser.parseFromString(svgString, "image/svg+xml")
//       const svgElement = svgDoc.documentElement
//       button.appendChild(svgElement)
//       button.onclick = () => {
//         const text = document.getElementById(`${index}`)?.outerText
//         copyToClipboard(text)
//       }
//       item.id = `${index.toString()}-answer`
//       item.parentElement?.appendChild(button)
//     })
//   }

//   chrome.runtime.onMessage.addListener((obj, sender, response) => {
//     addCopyButton()
//   })

//   // Select the target node
//   const targetNode = document.body

//   // Create an observer instance
//   const observer = new MutationObserver(function () {
//     // let answers = document.querySelectorAll(".markdown") 
//     // if (answers.length > 0 && !document.getElementById(`${answers.length}-answer`)) {
//     //   addCopyButton()
//     // } 
//     console.log("changing")
//   })



//   // Configuration of the observer:
//   const config = { attributes: false, childList: true, subtree: true }

//   // Pass in the target node, as well as the observer options
//   observer.observe(targetNode, config)
//   if(contentLoaded) {
//     console.log("hello from the world")
//   }

//   addCopyButton()
// })()


const allAnswers = () => [...document.querySelectorAll(".markdown.prose")];

window.addEventListener('load', () => {

    newChatLoadObserver();
    function newChatLoadObserver() {
        waitForElement('nav a, form textarea', () => {
            const navElements = document.querySelectorAll('nav > div a, nav a:nth-child(1)');
            navElements.forEach((navEl) => {
                navEl.addEventListener('click', async () => {
                    await new Promise(r => setTimeout(r, 250));
                    waitForElement('.text-base, main h1', () => {
                        if (document.querySelector('.text-base')) {
                            console.log('existing chat loaded');
                            newChatLoaded();
                        } else if (document.querySelector('main h1')) {
                            console.log('new chat opened');
                            newChatLoaded();
                        }
                        newChatLoadObserver();
                    });
                });
            });
        });
    }

    setInterval(() => {
        newChatLoaded();
    }, 1000);

    function newChatLoaded() {
        try {
            updateActionElements();
        } catch (error) {
            console.error('Error in updateActionElements:', error);
        }
    }

    waitForElement('main > div.overflow-hidden', (messageWrapper) => {
        (() => {
            updateActionElements();
            const observer = new MutationObserver(() => {
                updateActionElements();
            });
            observer.observe(messageWrapper, { childList: true, subtree: true });
        })();
    });

    function updateActionElements() {
        const answers = allAnswers();
        answers.forEach((resultElement, i) => {
            actionUpdates(resultElement, i);
            resultElement.addEventListener("DOMSubtreeModified", () => {
                actionUpdates(resultElement, i);
            });
        });
    }

    function actionUpdates(resultElement, i) {
        actionContainer(resultElement, i);
        addCopyButtonToResult(resultElement, i);
        updateCounterForResult(resultElement, i);
    }

    function actionContainer(answer, i) {
        if (document.querySelector(`#action-buttons-${i}`)) return;
        let actionContainer = Object.assign(document.createElement('div'), {
            id: `action-buttons-${i}`,
            className: 'gpt-copyit gptc-actions'
        })
        answer.insertAdjacentElement("afterend", actionContainer);
    }

    function updateCounterForResult(answer, index) {
        const prevCounter = document.querySelector(`#action-buttons-counter-${index}`);
        const prevCounterText = prevCounter ? prevCounter.innerText : "";

        const answerText = answer.innerText;
        const answerChars = answerText.length;
        const answerWords = answerText.split(/[ /]/).length;

        const counterElement = Object.assign(document.createElement("div"), {
            textContent: `${answerChars || 0} chars | ${answerWords || 0} words`,
            className: 'gpt-copyit gptc-msg-details'
        })
        if (prevCounterText !== counterElement.textContent) {
            if (prevCounter) prevCounter.remove();
            counterElement.id = `action-buttons-counter-${index}`;
            const actionWrapper = document.querySelector(`#action-buttons-${index}`);
            actionWrapper.appendChild(counterElement);
        }
    }

    function addCopyButtonToResult(answer, index) {
        if (document.querySelector(`#result-copy-button-${index}`)) return;
        const actionWrapper = document.querySelector(`#action-buttons-${index}`);

        const actionButtonWrapper = Object.assign(document.createElement('div'), {
            className: 'gpt-copyit gptc-action-buttons'
        })

        var elementText = () => answer.innerText.replace('Copy code', '');

        const copyButton = Object.assign(document.createElement('button'), {
            id: `result-copy-button-${index}`,
            className: 'gpt-copyit gptc-button',
            textContent: 'Copy',
            onclick: (e) => {
                navigator.clipboard.writeText(elementText());
                copyButton.textContent = "Copied!";
                copyButton.style.backgroundColor = '#00FF00';
                setTimeout(() => {
                    copyButton.textContent = "Copy";
                    copyButton.style.backgroundColor = '#343441';
                }, 1500);
            }
        });
        actionButtonWrapper.appendChild(copyButton);

        actionWrapper.appendChild(actionButtonWrapper);
    }
});

function waitForElement(selector, callback, maxWaitTime = 5000, speed = 100, notFoundCallback = null) {
    const endTime = Date.now() + maxWaitTime;
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
        if (Date.now() >= endTime) {
            clearInterval(interval);
            if (notFoundCallback) {
                notFoundCallback();
            }
        }
    }, speed);
}