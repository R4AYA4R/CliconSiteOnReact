import { useEffect, useState } from "react"

// экспортируем функцию(наш хук),в параметре принимает ref(ссылку на html элемент)
export const useIsOnScreen=(ref)=>{
    // создаем состояние для разных состояний для того,чтобы знать,попадает ли html элемент в область observer 
    const [isIntersectingNow,setIsIntersectingNow] = useState({
        sectionTopIntersecting:false,
        sectionDealsIntersecting:false,
        sectionNewIntersecting:false,
        sectionMacIntersecting:false,
        sectionSellersIntersecting:false,
        sectionMainCatalogIntersecting:false,
        sectionAboutIntersecting:false,
        sectionTeamIntersecting:false,
        sectionTrustedIntersecting:false,
        sectionCartIntersecting:false,
        sectionProductPageIntersecting:false,
        sectionMainFormPageIntersecting:false,
        sectionUserPageIntersecting:false,
    })

    // создаем функцию для intersectionObserver,принимает в параметре все элементы,за которыми следит,и сам observer
    const callback = (entries,observer)=>{
        entries.forEach(entry => {
            // если элемент из всех отслеживаемых элементов сейчас наблюдается(то есть попал в зону видимости observer(в данном случае в зону видимости окна браузера))
            if(entry.isIntersecting){
                // если id html элемента,который сейчас наблюдается,равняется sectionTop
                if(entry.target.id === 'sectionTop'){
                    setIsIntersectingNow((prev)=>({...prev,sectionTopIntersecting:true}));// изменяем состояние текущего наблюдения,возвращая новый объект,куда разворачиваем все предыдущие состония как они и были,только меняем одно состояние для конкретного html элемента(в данном случае sectionTopIntersecting) на true, чтобы не обарачивать все в квадратные скобки и потом не писать return,просто можно обернуть объект в круглые скобки(это тоже самое)

                    observer.unobserve(entry.target); // убираем отслеживание текущего элемента,чтобы больше observer не следил за этим элементом
                }
                if(entry.target.id === 'sectionDeals'){
                    setIsIntersectingNow((prev)=>({...prev,sectionDealsIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionNew'){
                    setIsIntersectingNow((prev)=>({...prev,sectionNewIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionMac'){
                    setIsIntersectingNow((prev)=>({...prev,sectionMacIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionSellers'){
                    setIsIntersectingNow((prev)=>({...prev,sectionSellersIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'mainCatalog'){
                    setIsIntersectingNow((prev)=>({...prev,sectionMainCatalogIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionAbout'){
                    setIsIntersectingNow((prev)=>({...prev,sectionAboutIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionTeam'){
                    setIsIntersectingNow((prev)=>({...prev,sectionTeamIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionTrusted'){
                    setIsIntersectingNow((prev)=>({...prev,sectionTrustedIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionCart'){
                    setIsIntersectingNow((prev)=>({...prev,sectionCartIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'sectionProductPage'){
                    setIsIntersectingNow((prev)=>({...prev,sectionProductPageIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'formPage'){
                    setIsIntersectingNow((prev)=>({...prev,sectionMainFormPageIntersecting:true}));
                    observer.unobserve(entry.target);
                }
                if(entry.target.id === 'userPage'){
                    setIsIntersectingNow((prev)=>({...prev,sectionUserPageIntersecting:true}));
                    observer.unobserve(entry.target);
                }
            }
        });
    }

    const observer = new IntersectionObserver(callback); // создаем intersectionObserver и передаем в параметре нашу функцию callback,которая будет обрабатывать этот observer

    // создаем useEffect,чтобы запуск observer сработал при запуске сайта
    useEffect(()=>{
        observer.observe(ref.current); // запускаем слежку нашего observer,и в observe() передаем ref.current,ссылку на html элемент(за которым нужно следить),который будем передавать потом при вызове этого всего хука
    },[])

    return isIntersectingNow; // возвращаем весь объект состояний,чтобы потом делать проверки,наблюдается ли сейчас элемент обзервером или нет
}