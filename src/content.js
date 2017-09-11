const jiraRegex = /atlassian/g

const aTags = document.body.querySelectorAll("a[href^='http']")
const aTagsArray = Array.from(aTags)

const jiraLinks = aTagsArray.filter((el) => {
	return jiraRegex.test(el.getAttribute('href'))
})

jiraLinks[0].addEventListener("mouseenter", () => {
	// const iframe = document.createElement('iframe')
	const url = jiraLinks[0].getAttribute('href')
	const xhr = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			let doc = document.implementation.createHTMLDocument("buffer")
			doc.documentElement.innerHTML = xhr.responseText
			const ticketDescription = doc.documentElement.querySelector("#descriptionmodule")
			jiraLinks[0].parentElement.insertBefore(ticketDescription, jiraLinks[0].nextSibling)
		}
	}
	xhr.send()
})
