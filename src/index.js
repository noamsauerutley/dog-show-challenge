document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById("table-body")
    const dogForm = document.getElementById("dog-form")

    let allDogs = async () => {
        let response = await fetch ('http://localhost:3000/dogs')
        let dogs = await response.json()
        dogs.forEach(dog => {
            let dogRow = document.createElement("tr")

            let nameCell = document.createElement("td")
            nameCell.innerText = dog.name
            dogRow.appendChild(nameCell)

            let breedCell = document.createElement("td")
            breedCell.innerText = dog.breed
            dogRow.appendChild(breedCell)

            let sexCell = document.createElement("td")
            sexCell.innerText = dog.sex
            dogRow.appendChild(sexCell)

            let editCell = document.createElement("td")
            let editButton = document.createElement("button")
            editButton.innerText = "Edit Dog"
            editButton.addEventListener("click", () => {
                dogForm.name.value = dog.name
                dogForm.breed.value = dog.breed
                dogForm.sex.value = dog.sex

                dogForm.addEventListener("submit", async (event) => {
                    event.preventDefault()
                    let editedDog = await editDog(dog)
                    nameCell.innerText = editedDog.name
                    breedCell.innerText = editedDog.breed
                    sexCell.innerText = editedDog.breed
                })
            })
            editCell.appendChild(editButton)
            dogRow.appendChild(editCell)
            dogTable.appendChild(dogRow)
        })

        let editDog = async (dog) => {
            let id = dog.id
            let formData = {
                name: event.target.name.value,
                breed: event.target.breed.value,
                sex: event.target.sex.value
            }

            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            }

            let response = await fetch ("http://localhost:3000/dogs/" + id, configObj)
            let editedDog = await response.json()
            return editedDog
        }
        

    }
    allDogs()
})