function showTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}
function filterProfiles() {
    const input = document.getElementById('headerSearchInput').value.toLowerCase();

    const filtered = profilesData.filter(profile =>
        profile.name.toLowerCase().includes(input) ||
        profile.phone.includes(input) ||
        profile.email.toLowerCase().includes(input)
    );

    renderProfiles(filtered);
}


function filterCourses() {
    const input = document.getElementById('courseSearchInput').value.toLowerCase();
    const courses = document.querySelectorAll('#courseList li');
    courses.forEach(course => {
        if (course.textContent.toLowerCase().includes(input)) {
            course.style.display = 'list-item';
        } else {
            course.style.display = 'none';
        }
    });
}

function filterProgress() {
    const input = document.getElementById('progressSearchInput').value.toLowerCase();
    const progressItems = document.querySelectorAll('#progressList p');
    progressItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterPayments() {
    const input = document.getElementById('paymentSearchInput').value.toLowerCase();
    const payments = document.querySelectorAll('#paymentList p');
    payments.forEach(payment => {
        if (payment.textContent.toLowerCase().includes(input)) {
            payment.style.display = 'block';
        } else {
            payment.style.display = 'none';
        }
    });
}
// 動態渲染
function renderProfiles(data) {
    const section = document.querySelector('.profile-section');
    section.innerHTML = '';

    if (data.length === 0) {
        const noResult = document.createElement('p');
        noResult.id = 'noResultMessage';
        noResult.style.color = 'red';
        noResult.textContent = '找不到符合的資料。';
        section.appendChild(noResult);
        return;
    }



    data.forEach(profile => {
        const div = document.createElement('div');
        div.className = 'profile-item';
        div.innerHTML = `
            <strong>${profile.name}</strong><br>
            電話: ${profile.phone}<br>
            Email: ${profile.email}
        `;
        section.appendChild(div);
    })
}

// 搜尋功能
function filterProfiles() {
    const input = document.getElementById('searchInput').value.toLowerCase();

    const filtered = profilesData.filter(profile =>
        profile.name.toLowerCase().includes(input) ||
        profile.phone.includes(input) ||
        profile.email.toLowerCase().includes(input)
    );

    renderProfiles(filtered);
}

// 清除搜尋
function clearSearch() {
    document.getElementById('searchInput').value = '';
    renderProfiles(profilesData);
}

function addProfile() {
    const id = prompt('請輸入學號：');
    const phone = prompt('請輸入電話：');
    const email = prompt('請輸入 Email：');

    if (id && phone && email) {
        const newProfile = { id, phone, email };
        profilesData.unshift(newProfile);
        saveToStorage();
        clearSearch();
        renderProfiles(profilesData);
        showTab('profile');
        alert('新增成功！');
    } else {
        alert('所有欄位皆為必填！');
    }
}


// 儲存至 localStorage
function saveToStorage() {
    localStorage.setItem('profilesData', JSON.stringify(profilesData));
}

// 輸入框按下 Enter 執行搜尋
document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        filterProfiles();
    }
});

// 初始化顯示
renderProfiles(profilesData);

