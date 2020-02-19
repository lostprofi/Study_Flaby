let dataJSON= '{"learnMoreSlogan": "A Modern Flat design corporate template for free download with all great features and trendy look. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "readMoreUnlimited": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}';

$('document').ready(()=>{
    
    const $data = jQuery.parseJSON(dataJSON);
    
    const $navbarBtnCollapse = $('.navbar__btn_collapse');
    
    const $collapseNavbar = $('.navbar__collapse');
    
    const $modalDataLearnMore = $('#modal-data-learn-more');
    const $modalDataUnlimReadMore = $('#modal-data-unlim-read-more');
    
    const $learnMoreBtn = $('#learn-more');
    
    const $unlimReadMoreBtn = $('#unlim-read-more');
    
    let mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        loop: true,
        preloadImages: false,
        lazy: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    
   
    
    
      
   $navbarBtnCollapse.on('click', ()=>{
       $collapseNavbar.slideToggle();
   });
    
    
    $learnMoreBtn.on('click', ()=>{
        $modalDataLearnMore.text($data.learnMoreSlogan);
    })
    
    $unlimReadMoreBtn.on('click', ()=>{
        $modalDataUnlimReadMore.text($data.readMoreUnlimited);
    })
    
    
});