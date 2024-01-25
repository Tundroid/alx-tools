/**
 * ALX Quiz Checker - Helps avoid over scrolling during quizes
 * @author: Felix Kimbu <felixkimbu@outlook.com>
 * @version: 2024.01.24.12.20
 */

/* Get quiz submit button */
const submitBtn = document.getElementsByClassName("btn-primary")[0];

/* Get count of quiz questions */
const questionCount = document.getElementsByClassName("quiz_question").length;

let newErrorCount = 0;
let oldErrorCount = 0;

/**
 * check - Provide quiz state / result
 */
function check(){
    /* Get number of errors after submission */
    newErrorCount = parseInt(document.getElementsByClassName("error")[0].innerHTML.split(" ")[0]);
    
    let errorDifference = newErrorCount - oldErrorCount;
    
    console.log("After checking at", Date().toLocaleString(), "...");
    if (errorDifference < 0)
        console.log("You Passed:", Math.abs(errorDifference), "questions this time.");
    else if (errorDifference > 0)
        console.log("You Failed:", errorDifference, "questions this time.");
    else
        console.log("No change!");
    
    let done = questionCount - newErrorCount;
    console.log("Completed quiz questions:", done, "/", questionCount);
    oldErrorCount = newErrorCount;
}

try
{
    if (observer);
} catch (ReferenceError)
{
    console.log("Creating observer...");
    /* MutationObserver to monitor the submit button
     * i.e. check if the button has re-appeared
     * (display changed from none to something else)
     * N.B: This is important because the check is an asynchronous
     * operation with an undefined time.
     */
    observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.attributeName === 'style') {
          let display = submitBtn.style.display;
          if (display !== 'none') {
            check();
          }
        }
      }
    });
    /* Register the submit button with the observer */
    observer.observe(submitBtn, {
      attributes: true, // observe attribute changes
      attributeFilter: ['style'] // only observe style changes
    });
}
