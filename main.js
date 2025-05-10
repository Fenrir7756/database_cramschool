function showTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}
function filterProfiles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const profiles = document.querySelectorAll('#profileList .profile-section');

    profiles.forEach(profile => {
        const textContent = profile.textContent.toLowerCase();
        if (textContent.includes(searchInput)) {
            profile.style.display = 'block'; // 顯示符合條件的資料
        } else {
            profile.style.display = 'none'; // 隱藏不符合條件的資料
        }
    });
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
    let name = '';
    while (!name) {
        name = prompt('請輸入姓名：');
        if (!name) alert('姓名為必填！');
    }

    let id = '';
    while (!id) {
        id = prompt('請輸入學號：');
        if (!id) alert('學號為必填！');
    }

    let phone = '';
    while (!phone) {
        phone = prompt('請輸入電話：');
        if (!phone) alert('電話為必填！');
    }

    let email = '';
    while (!email) {
        email = prompt('請輸入 Email：');
        if (!email) alert('Email 為必填！');
    }

    if (name && id && phone && email) {
        const newProfile = { name, id, phone, email };
        profilesData.unshift(newProfile); // 將新資料加入陣列
        saveToStorage(); // 儲存至 localStorage
        renderProfiles(profilesData); // 重新渲染資料
        clearSearch(); // 清除搜尋框
        showTab('profile'); // 顯示個人資料頁籤
        alert('新增成功！');
    } else {
        alert('所有欄位皆為必填！');
    }
}
