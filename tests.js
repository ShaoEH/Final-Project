let passCount = 0;
let failCount = 0;

function assertEqual(testName, actual, expected) {
    const resultsList = document.getElementById('test-results');
    const li = document.createElement('li');
    
    const actualStr = typeof actual === 'object' ? JSON.stringify(actual) : String(actual);
    const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);

    if (actualStr === expectedStr) {
        li.className = 'pass';
        li.innerText = `[PASS] ${testName}`;
        passCount++;
    } else {
        li.className = 'fail';
        li.innerText = `[FAIL] ${testName} \n       Expected: ${expectedStr} \n       Got: ${actualStr}`;
        failCount++;
    }
    resultsList.appendChild(li);
}

function runAllTests() {
    
    assertEqual(
        "Data Integrity: Should load exactly 9 artworks into the catalog.", 
        artworks.length, 
        9
    );

    assertEqual(
        "Form Validation: validateEmail() should return TRUE for a valid email format.", 
        appLogic.validateEmail("client@example.com"), 
        true
    );

    assertEqual(
        "Form Validation: validateEmail() should return FALSE if '@' is missing.", 
        appLogic.validateEmail("invalid-email.com"), 
        false
    );

    const oilArtworks = appLogic.filterArtworks(artworks, 'oil', '');
    assertEqual(
        "Gallery Filter: filterArtworks() should return exactly 3 items when filtering by 'oil'.", 
        oilArtworks.length, 
        3
    );

    const searchArtworks = appLogic.filterArtworks(artworks, 'all', 'Cyber');
    assertEqual(
        "Gallery Search: filterArtworks() should find 'Cyber Pulse' when searching for 'Cyber'.", 
        searchArtworks[0].title, 
        "Cyber Pulse"
    );

    const summaryDiv = document.getElementById('test-summary');
    summaryDiv.innerText = `Test Suite Completed: ${passCount} Passed, ${failCount} Failed.`;
    summaryDiv.className = failCount === 0 ? 'summary pass' : 'summary fail';
}

setTimeout(runAllTests, 100);