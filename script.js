let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('totalCount');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const cardsSection = document.getElementById('cards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');

function noJobs() {
    return `
        <div class="flex flex-col items-center justify-center py-20 w-full">
            <img src="./jobs.png" class="w-16 opacity-50 mb-4" alt="No jobs">
            <h2 class="text-2xl font-bold text-black">No jobs available</h2>
            <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>
    `;
}


function jobsCount() {
    total.innerText = cardsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (cardsSection.children.length === 0 && currentStatus === 'all-filter-btn') {
        cardsSection.innerHTML = noJobs();
    }
}

jobsCount();


function toggleStyle(id) {
    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-black', 'text-white');

    if (id == 'interview-filter-btn') {
        cardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        cardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
        if (cardsSection.children.length === 0) {
             CardsSection.innerHTML = noJobs();
        }
    } else if (id == 'rejected-filter-btn') {
        cardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected()
    }
}



mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobTitle = parenNode.querySelector('.job-title').innerText;
        const jobSubTitle = parenNode.querySelector('.job-subtitle').innerText;
        const jobLocation = parenNode.querySelector('.working-location').innerText;
        const jobType = parenNode.querySelector('.job-type').innerText;
        const jobSalary = parenNode.querySelector('.job-salery').innerText;
        const jobStatus = parenNode.querySelector('.job-status').innerText;
        const shortDes = parenNode.querySelector('.short-des').innerText;

        parenNode.querySelector('.job-status').innerText = 'Interview';

        const cardInfo = {
            jobTitle,
            jobSubTitle,
            jobLocation,
            jobType,
            jobSalary,
            jobStatus: 'Interview',
            shortDes
        };

        const jobExist = interviewList.find(item => item.jobTitle == cardInfo.jobTitle);

        if (!jobExist) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.jobTitle != cardInfo.jobTitle);

        if (currentStatus == 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus == 'rejected-filter-btn') {
            renderRejected();
        }

        jobsCount();


    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobTitle = parenNode.querySelector('.job-title').innerText;
        const jobSubTitle = parenNode.querySelector('.job-subtitle').innerText;
        const jobLocation = parenNode.querySelector('.working-location').innerText;
        const jobType = parenNode.querySelector('.job-type').innerText;
        const jobSalary = parenNode.querySelector('.job-salery').innerText;
        const jobStatus = parenNode.querySelector('.job-status').innerText;
        const shortDes = parenNode.querySelector('.short-des').innerText;

        parenNode.querySelector('.job-status').innerText = 'Rejected';

        const cardInfo = {
            jobTitle,
            jobSubTitle,
            jobLocation,
            jobType,
            jobSalary,
            jobStatus: 'Rejected',
            shortDes
        };

        const jobExist = rejectedList.find(item => item.jobTitle == cardInfo.jobTitle);

        if (!jobExist) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.jobTitle != cardInfo.jobTitle);

        if (currentStatus == "rejected-filter-btn") {
            renderRejected();
        } else if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        
        jobsCount();

    } else if (event.target.classList.contains('delete-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const jobTitle = parenNode.querySelector('.job-title').innerText;

        parenNode.remove();

        interviewList = interviewList.filter(item => item.jobTitle != jobTitle);
        rejectedList = rejectedList.filter(item => item.jobTitle != jobTitle);

        if (currentStatus == 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus == 'rejected-filter-btn') {
            renderRejected();
        }
        jobsCount();
    }
});

function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        filterSection.innerHTML = noJobs();
        return;
    }

    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8 mb-4';
        div.innerHTML = `
         <div class="space-y-4">
                    <div>
                        <p class="job-title text-2xl font-bold">${interview.jobTitle}</p>
                        <p class="job-subtitle">${interview.jobSubTitle}</p>
                    </div>
                    <div class="flex gap-2">
                        <p class="working-location">${interview.jobLocation}</p>
                        <p>-</p>
                        <p class="job-type">${interview.jobType}</p>
                        <p>-</p>
                        <p class="job-salery">${interview.jobSalary}</p>
                    </div>
                     <p class="job-status bg-gray-200 px-4 py-2 inline-block" >${interview.jobStatus}</p>
                     <p class="short-des">${interview.shortDes}</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                     </div>
                </div>
                <div>
                    <button class="delete-btn bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedList.length === 0) {
        filterSection.innerHTML = noJobs();
        return;
    }
    
    for (let rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8 mb-4';
        div.innerHTML = `
         <div class="space-y-4">
                    <div>
                        <p class="job-title text-2xl font-bold">${rejected.jobTitle}</p>
                        <p class="job-subtitle">${rejected.jobSubTitle}</p>
                    </div>
                    <div class="flex gap-2">
                        <p class="working-location">${rejected.jobLocation}</p>
                        <p>-</p>
                        <p class="job-type">${rejected.jobType}</p>
                        <p>-</p>
                        <p class="job-salery">${rejected.jobSalary}</p>
                    </div>
                     <p class="job-status bg-gray-200 px-4 py-2 inline-block" >${rejected.jobStatus}</p>
                     <p class="short-des">${rejected.shortDes}</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                     </div>
                </div>
                <div>
                    <button class="delete-btn bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `;
        filterSection.appendChild(div);
    }
}


