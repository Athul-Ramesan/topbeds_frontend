export const scrollToTop =()=>{
    console.log('scrolltoTop called')
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}