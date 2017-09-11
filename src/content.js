const jiraRegex = /atlassian/g

const aTags = document.body.querySelectorAll("a[href^='http']")
const aTagsArray = Array.from(aTags)

const jiraLinks = aTagsArray.filter((el) => {
	return jiraRegex.test(el.getAttribute('href'))
})

jiraLinks[0].addEventListener("mouseenter", () => {
	alert("wow!")
})
