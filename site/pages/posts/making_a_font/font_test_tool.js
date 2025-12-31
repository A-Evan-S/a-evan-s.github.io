const sizeInput = document.getElementById('test-tool-size');
const testingText = document.getElementById('testing-text');
const sampleText0 = document.getElementById('clear-text');
const sampleText1 = document.getElementById('lorem-ipsum');
const sampleText2 = document.getElementById('pangrams');
const sampleText3 = document.getElementById('nums-symbols');

sizeInput.addEventListener('change', function() {
    testingText.style.fontSize = sizeInput.value + "px";
});

sampleText0.addEventListener('click', function() {
    testingText.value = "";
});

sampleText1.addEventListener('click', function() {
    testingText.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
});

sampleText2.addEventListener('click', function() {
    testingText.value = "Jim quickly realized that the beautiful gowns are expensive.\nFive quacking zephyrs jolt my wax bed.\nThe wizard quickly jinxed the gnomes before they vaporized.\nThe quick onyx goblin jumps over the lazy dwarf.";
});

sampleText3.addEventListener('click', function() { // TODO: make more fun sample text
    testingText.value = "\"The project, costing $1,250,000.75 (USD), requires 50+ team members; its deadline (Dec. 31st, 2025) is critical! Use @ to tag users, #hashtags for topics, & symbols like < > for ranges (e.g., ages 18–25).\"";
});