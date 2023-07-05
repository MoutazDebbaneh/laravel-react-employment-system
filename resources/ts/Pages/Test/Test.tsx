import { Link, Head } from '@inertiajs/react';
import { Locale } from '@/enums/app_enums';
import Container from '@/Utils/Container';
import '../../../css/animation.css'
import bannerImg1 from '/resources/images/banner1.png'
import bannerImg2 from '/resources/images/banner2.png'
import bottomBannerImg from '/resources/images/icon-bottom-banner.png'
import topBannerImg from '/resources/images/icon-top-banner.png'
import NewLayout from '@/Layouts/NewLayout';
import PageLocalizer from '@/Components/PageLocalizer';


export default function Test({ locale, translations }: { locale: Locale, translations: Translations }) {


    console.log(translations);


    return (
        <NewLayout locale={locale} translations={translations.navbar as Translations} >

            <PageLocalizer locale={locale} />
            <Head title={(translations.navbar as Translations).title.toString()} />

            <div className="bg-[url('/resources/images/bg-banner.svg')] bg-no-repeat bg-left-top bg-cover fixed -z-50 w-full top-0 right-0 min-h-[835px]">
            </div>
            <Container className='max-w-full'>
                <section className='top-section mt-[4.6rem] max-w-full mx-10 lg:mx-0 grid grid-cols-1 2xl:grid-cols-2'>
                    <div className="left-section">
                        <h1 className='text-[3.5rem] leading-[3.75rem] text-dark-blue font-extrabold max-w-10'>
                            The <span className='relative text-primary-blue after:bg-primary-blue after:block after:content-[""] after:absolute after:h-[25px] after:w-full after:left-0 after:bottom-translate-y-24 after:z-10 after:opacity-10'>Easiest Way</span>
                            <br />
                            to Get Your New Job
                        </h1>
                        <p className='text-muted text-[1.235rem] mt-5 2xl:w-full w-3/4'>
                            Each month, more than 3 million job seekers turn to
                            website in their search for work, making over 140,000
                            applications every single day
                        </p>
                        <div className="quick-search">
                            <div className="form-rect w-[40rem] bg-white rounded-lg my-10 shadow-xl h-16">hi</div>
                        </div>
                    </div>
                    <div className="right-section hidden 2xl:block">
                        <div className="banner-imgs relative">
                            <div className="shape-1 absolute -top-10 left-28"><img className="img" alt="jobBox" src={bannerImg1} /></div>
                            <div className="shape-2 absolute top-60 left-64"><img className="img" alt="jobBox" src={bannerImg2} /></div>
                            <div className="shape-3 absolute left-[25.1rem]"><img className="img" alt="jobBox" src={topBannerImg} /></div>
                            <div className="shape-3 absolute left-[11.25rem] top-[23.4rem]"><img className="img" alt="jobBox" src={bottomBannerImg} /></div>
                        </div>
                    </div>
                </section>
            </Container>
        </NewLayout>
    )
}