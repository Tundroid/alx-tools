/**
 * ALX Quiz Checker - Helps avoid over-scrolling during quizes
 * @author: Felix Kimbu <felixkimbu@outlook.com>
 * @version: 1.0.0
 */

/* Get quiz submit button */
const submitBtn = document.getElementsByClassName('btn-primary')[0];

/* Get count of quiz questions */
const questionCount = document.getElementsByClassName('quiz_question').length;

const dateFormat = {
	year: 'numeric',
	month: 'short',
	day: 'numeric', 
	hour: 'numeric', 
	minute: 'numeric', 
	second: 'numeric'
};

let newErrorCount = 0;
let oldErrorCount = 0;

/**
 * check - Provide quiz state / result
 */
function check() {
	/* Get number of errors after submission */
	newErrorCount = parseInt(document.getElementsByClassName('error')[0].innerHTML.split(' ')[0]);

	let errorDifference = newErrorCount - oldErrorCount;

	/* Prepare output message */
	let msg = '<em>After checking at ' + new Date().toLocaleString('en-US', dateFormat) + '</em><hr/>';
	if (errorDifference < 0)
		msg += 'You Passed: <h4>\uD83D\uDE09 ' + Math.abs(errorDifference) + '</h4>';
	else if (errorDifference > 0)
		msg += 'You Failed: <h4>\uD83D\uDE14 ' + errorDifference + '</h4>';
	else
		msg += 'No change! \uD83D\uDE42<br/>';

	let done = questionCount - newErrorCount;
	msg += 'Completed quiz questions: <h4>' + done + ' / ' + questionCount + '</h4>';
	const cardMsg = document.getElementById('quizMsg');
	/* Add message to card or print on console */
	if (cardMsg) {
		cardMsg.innerHTML = msg;
		document.getElementById('cardBtn').disabled = false;
	}
	else {
		console.log(msg);
	}
	oldErrorCount = newErrorCount;
}

try { // check if observer is registered already
	if (observer);
} catch (ReferenceError) { // create and register observer
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

/**
 * setupCard - prepares and displays quiz card
 */
function setupCard() {
	/* Cet card from DOM */
	const card = document.getElementById('quizCard');

	/* Check if the card doest not exist */
	if (!card) {
		/* Card container */
		const cardContainer = document.createElement('div');
		cardContainer.id = 'quizCard'; // Set an ID to identify the card
		cardContainer.style.position = 'fixed';
		cardContainer.style.right = '0';
		cardContainer.style.top = '50%';
		cardContainer.style.transform = 'translateY(-50%)';
		cardContainer.style.backgroundColor = '#3498db';
		cardContainer.style.padding = '10px';
		cardContainer.style.borderRadius = '5px';
		cardContainer.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)';
		cardContainer.style.zIndex = '1000';

		/* Card header */
		const cardHeader = document.createElement('h3');
		cardHeader.innerText = 'Quiz Checker \u2714';
		cardHeader.style.textAlign = 'center';
		cardHeader.style.backgroundColor = '#2980b9';
		cardHeader.style.color = '#fff';
		cardHeader.style.padding = '8px';

		/* Card body */
		const cardContent = document.createElement('div');
		cardContent.id = 'quizMsg';
		cardContent.innerText = 'Nice and quiet here! \uD83D\uDE42';
		cardContent.style.color = '#fff';
		cardContent.style.textAlign = 'center';
		cardContent.style.marginBottom = '10px';

		/* Card button */
		const cardButton = document.createElement('button');
		cardButton.id = 'cardBtn';
		cardButton.innerText = 'Check';
		cardButton.style.textAlign = 'center';
		cardButton.style.display = 'block';
		cardButton.style.margin = '0 auto';
		cardButton.style.padding = '8px 16px';
		cardButton.style.backgroundColor = '#2ecc71';
		cardButton.style.color = '#fff';
		cardButton.style.border = 'none';
		cardButton.style.borderRadius = '3px';
		cardButton.style.cursor = 'pointer';
		cardButton.onclick = () => {
			submitBtn.click();
			cardButton.disabled = true;
		};

		/* Append header, body and buton card container */
		cardContainer.appendChild(cardHeader);
		cardContainer.appendChild(cardContent);
		cardContainer.appendChild(cardButton);

		/* Append card container to the html body */
		document.body.appendChild(cardContainer);
		console.log('Card added to DOM.');
	} else {
		console.log('Nothing to do here.');
	}
}

/**
 * tearDownCard - Remove card from DOM
 */
function tearDownCard() {
	/* Get card element */
	const card = document.getElementById('quizCard');

	/* Remove element if it exist */
	if (card) {
		card.parentNode.removeChild(card);
		console.log('Card removed from DOM.');
	} else {
		console.log('Nothing to do here.');
	}
}
