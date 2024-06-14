import loader from '../../images/Preloader.svg'

function Preloader() {
    console.log('preloader has worked')
    return (
        <div className='preloader'>
            <img src={loader} alt="loading..." />
        </div>
    );
}

export default Preloader;
