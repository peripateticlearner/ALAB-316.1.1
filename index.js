// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

// Part 1:
// Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector("main");
// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl.style.backgroundColor = "var(--main-bg)";
// Set the content of mainEl to <h1>DOM Manipulation</h1>.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;
// Add a class of flex-ctr to mainEl.
mainEl.classList.add("flex-ctr");

// Part 2:
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById("top-menu");
// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");

// Part 3:
// Iterate over the entire menuLinks array and for each "link" object:
for (let i = 0; i < menuLinks.length; i++) {
    // Create an <a> element.
    const linkEl = document.createElement("a");
    // Set the href attribute to the href property of the "link" object.
    linkEl.setAttribute("href", menuLinks[i].href);
    // Set the new element's content to the value of the text property of the "link" object.
    linkEl.textContent = menuLinks[i].text;
    // Append the new element to the topMenuEl element.
    topMenuEl.appendChild(linkEl);
}

// ----------------------Section 2:-------------------------------
// Part 3:
// Set up Submenu
const subMenuEl = document.getElementById("sub-menu");
// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = "100%";
// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add("flex-around");
// Temporarily hide the submenu
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Part 4:
const topMenuLinks = document.querySelectorAll("a");
// Add a click event listener to the <nav> element (not individual links)
topMenuEl.addEventListener("click", (e) => {
    e.preventDefault(); // Stop the link from actually navigating to another page
    if (e.target.matches("a") === false) {
        return;
    } // Make sure the clicked element is actually a link <a>
    console.log(e.target.textContent); // Log the text of the link that was clicked
});

// Part 5:
// tracking the currently active link
let activeLink = null;

topMenuEl.addEventListener("click", (e) => {
    e.preventDefault(); // stopping the link from navigating.
    if (e.target.matches("a") === false) { // making sure link was clicked
        return;
    }
    const clickedLink = e.target;
    // removing active class from any previously active link
    if (activeLink) {
        activeLink.classList.remove("active");
    }
    // toggling the clicked link active
    if (clickedLink !== activeLink) {
        clickedLink.classList.add("active");
        activeLink = clickedLink;
    } else {
        activeLink = null;
        subMenuEl.style.top = "0"; // Hide submenu
        return;
    }
    // find clicked link in menuLinks
    const clickedMenuItem = menuLinks.find(function(item) {
        return item.text === clickedLink.textContent;
    })
    if(clickedMenuItem && clickedMenuItem.subLinks) {
        // If submenu exists, build the submenu and show it
        buildSubmenu(clickedMenuItem.subLinks);
        subMenuEl.style.top = "100%"; // showing submenu
        mainEl.innerHTML = `<h1>${clickedLink.textContent}</h1>`; // updating main content
    }
})

function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = ""; // Clearing existing submenu

    subLinks.forEach(subLink => {
        const a = document.createElement("a");
        a.href = subLink.href;
        a.textContent = subLink.text;
        subMenuEl.appendChild(a);
    });
}

subMenuEl.addEventListener("click", (e) => {
    e.preventDefault(); // Preventing navigation
    if (!e.target.matches("a")) return; // Ensuring an <a> was clicked

    subMenuEl.style.top = "0"; // Hiding submenu
    if (activeLink) activeLink.classList.remove("active"); // Removing active from main menu

    mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`; // Updating main content
});
