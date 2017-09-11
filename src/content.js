const jiraRegex = /atlassian/g

const aTags = document.body.querySelectorAll("a[href^='http']")
const aTagsArray = Array.from(aTags)

const jiraLinks = aTagsArray.filter((el) => {
	return jiraRegex.test(el.getAttribute('href'))
})

jiraLinks.forEach((element) => {
	element.addEventListener("mouseenter", () => {
		const url = element.getAttribute('href')
		const xhr = new XMLHttpRequest()

		xhr.open('GET', url, true)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				let doc = document.implementation.createHTMLDocument("buffer")
				doc.documentElement.innerHTML = xhr.responseText
				const ticketDescription = doc.documentElement.querySelector("#descriptionmodule")
				element.parentElement.insertBefore(ticketDescription, element.nextSibling)
			}
		}
		xhr.send()
	})
})
