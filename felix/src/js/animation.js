import { removeAllClasses, bodyLock, nodeArray } from "./utils/functions.js"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js"

gsap.registerPlugin( ScrollTrigger )

window.addEventListener('load', e => {
	fixMainNav()

	if (window.innerWidth > 800) {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".main",
				start: '50%',
				scrub: .5,
			}
		})
		.to('.main__thumb', {
			y: -50,
		})
	}

	gsap.utils.toArray('.b-princ').forEach( princ => {
		const princImg = princ.querySelector('.b-princ__img')
		const princContent = princ.querySelector('.b-princ__content')
		const DURATION = .7

		gsap.set( [ princImg, princContent ], { opacity: 0 } )

		gsap.timeline({
			scrollTrigger: {
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
							opacity: 0,
							overwrite: 'auto',
						}
					)

					gsap.to(
						princContent,
						{
							duration: DURATION,
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
							opacity: 1,
							overwrite: 'auto',
						}
					)

					gsap.to(
						princContent,
						{
							duration: DURATION,
							opacity: 1,
							overwrite: 'auto',
						}
					)
				},
			}
		})
	} )

	gsap.utils.toArray('.advant-b').forEach( advant => {
		const tick = advant.querySelector('.advant-b__tick')
		const separator = advant.querySelector('.advant-b__sep')
		const advantPrev = advant.previousElementSibling

		if ( separator ) {
			const arrow = separator.querySelector('.advant-b__sep-arrow')
			const lineSvg = separator.querySelector('svg')
			const linePath = lineSvg.querySelector('line')
			const lineHeight = advant.clientHeight - arrow.clientHeight

			lineSvg.setAttribute( 'viewBox', `0 0 2 ${lineHeight}` )
			linePath.setAttribute( 'y2', lineHeight )

			separator.dataset.height = separator.offsetHeight
			separator.style.height = 0
		}

		gsap.timeline({
			scrollTrigger: {
				trigger: advant,
				start: 'top 85%',
				end: 'bottom 85%',
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
							{
								height: advantPrevSeparator.dataset.height,
								opacity: 1,
							}
						)
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
			}
		} )
	} )
})

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
		}
		else if (navInspector.getBoundingClientRect().top > 0 && navInspector.classList.contains('has-fixed')) {
			navInspector.classList.remove('has-fixed')
			navInspector.style = ''

			if (headerFixed) nav.style = ''
		}
	}

	return navInspector
}