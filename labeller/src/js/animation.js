import { removeAllClasses, bodyLock, nodeArray } from "./utils/functions.js"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js"

gsap.registerPlugin( ScrollTrigger )

// console.log( gsap )

// ScrollTrigger.create({
// 	markers: true,
// 	trigger: '.main__thumb',
// 	start: 'top 0%',
// 	end: 'bottom 0%',
// 	pin: true,
// 	scrub: 1,
// 	toggleClass: { targets: '.main__thumb', className: 'is-active' },
// })

// const mainThumb = document.querySelector('.main__thumb')

window.addEventListener('load', e => {
	fixMainNav()

	// fixMainNav().addEventListener('menu-fixed', e => {
	// 	console.log('menu is fixed')
	// })

	if (window.innerWidth > 800) {
		gsap.timeline({
			scrollTrigger: {
				// markers: true,
				trigger: ".main",
				start: '50%',
				scrub: .5,
			}
		})
		.to('.main__thumb', {
			y: -50,
		})
	}

	// Утилиты для анимации блоков раздела "Принципы работы"
	// class PrincUtils {

	// 	constructor( elem ) {
	// 		this.elem = elem
	// 		this.img = elem.querySelector('.b-princ__img')
	// 		this.content = elem.querySelector('.b-princ__content')
	// 	}

	// 	hide() {
	// 		gsap.set( this.elem, { opacity: 0, } )
	// 	}

	// 	showFromDown( opt, _direction = 1 ) {
	// 		this._showDownOpt = opt
	// 		this.img.style.opacity = 1
	// 		this.img.style.transform = `translate(${ opt.x }, ${ opt.y })`

	// 		const coords = [
	// 			{
	// 				duration: 1.25,
	// 				x: opt.x,
	// 				y: opt.y,
	// 				opacity: 0,
	// 				overwrite: 'auto',
	// 			},
	// 			{
	// 				duration: 1.25,
	// 				x: 0,
	// 				y: 0,
	// 				opacity: 1,
	// 				overwrite: 'auto',
	// 			}
	// 		]

	// 		gsap.fromTo( this.elem, ...( _direction === 1 ? coords : coords.reverse() ) )
	// 	}

	// 	hideToDown( opt ) {
	// 		this.showFromDown( this._showDownOpt, -1 )
	// 	}

	// 	// showFromUp( opt, _direction = 1 ) {
	// 	// 	this.img.style.opacity = 1
	// 	// 	this.img.style.transform = `translate(${ opt.x }, ${ opt.y })`

	// 	// 	const coords = [
	// 	// 		{
	// 	// 			duration: 1.25,
	// 	// 			x: opt.x,
	// 	// 			y: opt.y,
	// 	// 			opacity: 0,
	// 	// 			overwrite: 'auto',
	// 	// 		},
	// 	// 		{
	// 	// 			duration: 1.25,
	// 	// 			x: 0,
	// 	// 			y: 0,
	// 	// 			opacity: 1,
	// 	// 			overwrite: 'auto',
	// 	// 		}
	// 	// 	]

	// 	// 	gsap.fromTo( this.elem, ...( _direction === 1 ? coords : coords.reverse() ) )
	// 	// }
	// }

	gsap.utils.toArray('.b-princ').forEach( princ => {
		// const princUtils = new PrincUtils(princ)
		const princImg = princ.querySelector('.b-princ__img')
		const princContent = princ.querySelector('.b-princ__content')
		const DURATION = 1

		gsap.set( [ princImg, princContent ], { opacity: 0 } )

		const princTl = gsap.timeline({
			scrollTrigger: {
				// markers: true,
				trigger: princ,
				start: window.innerWidth >= 768 ? 'top 70%' : 'top 50%',
				end: window.innerWidth >= 768 ? 'bottom 70%' : 'bottom 50%',
				onEnter: () => {

					gsap.fromTo(
						princImg,
						{
							y: 200,
							opacity: 0,
						},
						{
							duration: DURATION,
							y: 0,
							opacity: 1,
							overwrite: 'auto',
						}
					)
					gsap.fromTo(
						princContent,
						{
							y: 200,
							x: 200,
							scale: .7,
							opacity: 0,
						},
						{
							duration: DURATION,
							y: 0,
							x: 0,
							scale: 1,
							opacity: 1,
							overwrite: 'auto',
						}
					)
				},
				onLeaveBack: () => {

					gsap.to(
						princImg,
						{
							duration: DURATION,
							y: 200,
							opacity: 0,
							overwrite: 'auto',
						}
					)

					gsap.to(
						princContent,
						{
							duration: DURATION,
							y: 200,
							x: 200,
							scale: .7,
							opacity: 0,
							overwrite: 'auto',
						}
					)
				},
				onLeave: () => {

					gsap.to(
						princImg,
						{
							duration: DURATION,
							// y: -200,
							opacity: 0,
							overwrite: 'auto',
						}
					)

					gsap.to(
						princContent,
						{
							duration: DURATION,
							// y: -200,
							opacity: 0,
							overwrite: 'auto',
						}
					)
				},
				onEnterBack: () => {

					gsap.to(
						princImg,
						{
							duration: DURATION,
							// y: 0,
							opacity: 1,
							overwrite: 'auto',
						}
					)

					gsap.to(
						princContent,
						{
							duration: DURATION,
							// y: 0,
							opacity: 1,
							overwrite: 'auto',
						}
					)
				},
			}
		})
	} )



	// Фиксация шапки
	// const mainNav = document.querySelector('.main-nav')
	// const princ = document.querySelector('.princ')
	// const princTitle = princ.querySelector('.princ__s-header')
	// let princHeight = princ.offsetHeight - princ.querySelector('.princ__more').offsetHeight - princ.querySelector('.s-header__title').offsetHeight
	// const princBody = princ.querySelector('.princ__body')


	// gsap.timeline({
	// 	defaults: { duration: 1, ease: 'none', },
	// 	scrollTrigger: {
	// 		// markers: true,
	// 		trigger: princ,
	// 		start: `0 ${ mainNav.clientHeight }px`,
	// 		end: `${ princHeight } ${ mainNav.clientHeight }px`,
	// 		scrub: true,
	// 		onEnter: () => princTitle.classList.add('is-fixed'),
	// 		onLeaveBack: () => princTitle.classList.remove('is-fixed'),
	// 	}
	// })
	// .fromTo( princTitle, { y: 0, }, { y: princHeight, } )


	// const advantBlockElems = nodeArray('.advant-b')

	// gsap.utils.toArray('.advant-b').forEach( advantBlock => {
	// 	const advantTick = advantBlock.querySelector('.advant-b__tick')

	// 	gsap.timeline({
	// 		scrollTrigger: {
	// 			// markers: true,
	// 			trigger: advantBlock,
	// 			start: '0 50%',
	// 			onEnter: () => advantTick.classList.add('is-active'),
	// 			onLeaveBack: () => advantTick.classList.remove('is-active'),

	// 		}
	// 	})
	// } )


	gsap.utils.toArray('.advant-b').forEach( advant => {
		const tick = advant.querySelector('.advant-b__tick')
		const separator = advant.querySelector('.advant-b__sep')
		const advantPrev = advant.previousElementSibling

		if ( separator ) {
			const arrow = separator.querySelector('.advant-b__sep-arrow')
			const lineSvg = separator.querySelector('svg')
			const linePath = lineSvg.querySelector('line')
			// const lineHeight = advant.nextElementSibling.offsetTop - advant.offsetTop
			const lineHeight = advant.clientHeight - arrow.clientHeight

			lineSvg.setAttribute( 'viewBox', `0 0 2 ${lineHeight}` )
			linePath.setAttribute( 'y2', lineHeight )

			separator.dataset.height = separator.offsetHeight
			// console.log(separator.offsetHeight)
			separator.style.height = 0

			// console.log(advant.clientHeight, parseInt(window.getComputedStyle( advant ).getPropertyValue( 'padding-bottom' )), arrow.clientHeight)

			// console.log(lineHeight)
			// console.log(advant.nextElementSibling.offsetTop, advant.offsetTop, arrow.clientHeight, parseInt(window.getComputedStyle( advant.nextElementSibling ).getPropertyValue( 'padding-top' )))
			// console.dir(advant.nextElementSibling.querySelector('.advant-b__title'))
		}



		// gsap.set( advant, { opacity: 0 } )

		// if ( separator ) gsap.set( separator, { opacity: 0 } )

		gsap.timeline({
			scrollTrigger: {
				// markers: true,
				trigger: advant,
				start: 'top 80%',
				end: 'bottom 80%',
				onEnter: () => {
					tick.classList.add('is-active')

					gsap.fromTo(
						advant,
						{
							y: 200,
							opacity: 0,
						},
						{
							y: 0,
							opacity: 1,
						},
					)

					if ( advantPrev ) {
						const advantPrevSeparator = advantPrev.querySelector('.advant-b__sep')
						const arrow = advantPrevSeparator.querySelector('.advant-b__sep-arrow')

						gsap.to(
							advantPrevSeparator,
							// {
							// 	height: 0,
							// 	opacity: 0,
							// },
							{
								height: advantPrevSeparator.dataset.height,
								// height: advantPrev.nextElementSibling.querySelector('.advant-b__tick .advant-b__sep').offsetTop,
								// height: advantPrev.nextElementSibling.querySelector('.advant-b__tick .advant-b__sep').offsetTop - advantPrev.offsetTop - arrow.clientHeight,
								opacity: 1,
							}
						)

						console.log( advantPrevSeparator.offsetTop  )
					}
				},
				onLeaveBack: () => {
					tick.classList.remove('is-active')

					gsap.to(
						advant,
						{
							y: 200,
							opacity: 0,
						},
					)

					if ( advantPrev ) {
						const advantPrevSeparator = advantPrev.querySelector('.advant-b__sep')

						gsap.to(
							advantPrevSeparator,
							{
								height: 0,
								opacity: 0,
							}
						)
					}
				},
				onLeave: () => {
					// tick.classList.remove('is-active')
				},
				onEnterBack: () => {
					// tick.classList.add('is-active')
				}
			}
		} )
	} )
})

// Задаем высоту линиям со стрелками в блоках раздела "Преимущества"
// const advantArray = nodeArray('.advant-b')

// advantArray.forEach( advant => {
// 	const separator = advant.querySelector('.advant-b__sep')

// 	if (!separator) return

// 	const arrow = separator.querySelector('.advant-b__sep-arrow')
// 	const lineSvg = separator.querySelector('svg')
// 	const linePath = lineSvg.querySelector('line')
// 	const lineHeight = advant.nextElementSibling.querySelector('.advant-b__tick').offsetTop - advant.offsetTop - arrow.clientHeight - parseInt(window.getComputedStyle( advant ).getPropertyValue( 'padding-top' ))

// 	lineSvg.setAttribute( 'viewBox', `0 0 2 ${lineHeight}` )
// 	linePath.setAttribute( 'y2', lineHeight )
// } )


// Фиксация меню
function fixMainNav() {
	const navInspector = document.querySelector('.main-nav__inspector')
	const nav = navInspector.querySelector('.main-nav')
	const headerFixed = document.getElementById('headerfixed')

	window.addEventListener('scroll', fix)
	fix()

	function fix() {
		if (navInspector.getBoundingClientRect().top <= 0 && !navInspector.classList.contains('has-fixed')) {
			navInspector.style.height = nav.getBoundingClientRect().height + 'px'
			navInspector.classList.add('has-fixed')

			if (headerFixed) nav.style.top = headerFixed.clientHeight + 'px'
			navInspector.dispatchEvent( new Event( 'menu-fixed', { bubbles: true, composed: true } ) )
		}
		else if (navInspector.getBoundingClientRect().top > 0 && navInspector.classList.contains('has-fixed')) {
			navInspector.classList.remove('has-fixed')
			navInspector.style = ''

			if (headerFixed) nav.style = ''
			navInspector.dispatchEvent( new Event( 'menu-not-fixed', { bubbles: true, composed: true } ) )
		}
	}

	return navInspector
}