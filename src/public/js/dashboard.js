/* eslint-disable */ 
let departamets = [
    'Casanare',
    'Cundinamarca',
    'Arauca',
    'Cauca',
    'Choco',
    'Nariño',
    'Norte de Santander',
    'Valle del Cauca',
    'Caldas',
    'Antioquia',
    'Boyaca',
    'Guainia',
    'Vichada',
    'San Andres y Providencia',
    'Magdalena',
    'Putumayo',
    'Quindio',
    'Risaralda',
    'Tolima',
    'Atlantico',
    'Cesar',
    'Cordoba',
    'Guaviare',
    'Huila',
    'Meta',
    'Sucre',
    'Amazonas',
    'Vaupes',
    'Santander',
    'Bolivar',
    'La Guajira',
    'Caqueta'
]

let jobs = [
    'dancer',
    'teacher',
    'developer',
    'artist',
    'lawyer',
    'police',
    'chef',
    'model',
    'farmer',
    'scientist',
    'barber',
    'doctor',
]

let getAllData = async () => {
    let response = await axios('/api/dashboard/data')
    let data = response.data
    return data
}

let getAge = (fecha) => {
    let today = new Date();
    let birthDate = new Date(fecha);
    let age = today.getFullYear() - birthDate.getFullYear();
    let mont = today.getMonth() - birthDate.getMonth();

    if (mont < 0 || (mont === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}


getAllData()
    .then(res => {
        
        let peoplePerDepartamnet = new Array(departamets.length)

        res.users.map(user => {
            let intIndex = departamets.indexOf(user.department)
            peoplePerDepartamnet[intIndex]
                ? peoplePerDepartamnet[intIndex] += 1
                : peoplePerDepartamnet[intIndex] = 1
        })

        let data = [{
            title: '¿De que departamneto nos visitan?',
            x: departamets,
            y: peoplePerDepartamnet,
            type: 'bar'
        }];

        Plotly.newPlot('visitors', data)

        return {
            users: res.users,
            visitors: {
                departamets,
                peoplePerDepartamnet
            }
        }
    })
    .then(res => {
        // Graphic People per Jobs
        let peoplePerJobs = new Array(jobs.length)
        res.users.map(user => {
            let intIndex = jobs.indexOf(user.job)
            peoplePerJobs[intIndex]
                ? peoplePerJobs[intIndex] += 1
                : peoplePerJobs[intIndex] = 1
        })

        let data = [{
            x: peoplePerJobs,
            y: jobs,
            type: 'bar',
            orientation: 'h'
        }];
        
        let layout = {
            showlegend: false,
        }
        
        Plotly.newPlot('peoplePerJob', data, layout, {displayModeBar: true})

        return {
            ...res,
            peoplePerJobs: {
                jobs,
                peoplePerJobs
            }
        }
    })
    .then(res => {
        let agesRange = ['~16', '17-21', '22-26', '27-31', '32-36', '37-41', '42~']
        let ages = new Array(7)
        res.users.map(user => {
            let age = getAge(user.birthDate)
            if (age <= 16) {
                console.log(age);
                ages[0] ? ages[0] += 1 : ages[0] = 1
            } else if (age >= 17 && age <= 21) {
                ages[1] ? ages[1] += 1 : ages[1] = 1

            } else if (age >= 22 && age <= 26) {
                ages[2] ? ages[2] += 1 : ages[2] = 1

            } else if (age >= 27 && age <= 31) {
                ages[3] ? ages[3] += 1 : ages[3] = 1

            } else if (age >= 32 && age <= 36) {
                ages[4] ? ages[4] += 1 : ages[4] = 1

            } else if (age >= 37 && age <= 41) {
                ages[5] ? ages[5] += 1 : ages[5] = 1
                
            } else {
                ages[6] ? ages[6] += 1 : ages[6] = 1

            }
        })
        let data = [{
            type: 'pie',
            values: ages,
            labels: agesRange,
            textinfo: 'label+percent',
            textposition: 'outside',
            automargin: true
        }]

        var layout = {
            margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
            showlegend: false
        }

        Plotly.newPlot('perAges', data, layout)
        return {
            ...res,
            perAgesRange: {
                agesRange,
                ages
            }
        }
    })
    .then(res => {

        let genderOptions = ['Male', 'Female']
        let genderCount = [0, 0]
        res.users.map(user => {
            let gender = user.gender === 'Male'
            gender
                ? genderCount[0] += 1
                : genderCount[1] += 1
        })

        let data = [{
            type: 'pie',
            values: genderCount,
            labels: genderOptions,
            textinfo: 'label+percent',
            textposition: 'outside',
            automargin: true
        }]

        var layout = {
            margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
            showlegend: false
        }

        Plotly.newPlot('perGender', data, layout)
    })
