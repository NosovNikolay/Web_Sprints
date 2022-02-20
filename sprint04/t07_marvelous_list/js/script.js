let tab = function() {
    let tabNav = document.querySelectorAll('.tabsNavItem'),
        tabContent = document.querySelectorAll('.tab'),
        tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('isActive');
        });
        this.classList.add('isActive');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('isActive') : item.classList.remove('isActive');
        })
    }

};


tab();