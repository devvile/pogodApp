interface CurrentWeatherTitleProps{
    title:string;
    subtitle:string;
}

const CurrentWeatherTitle = ({title,subtitle}:CurrentWeatherTitleProps)=>{
    return (          <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-blue-200">{subtitle}</p>
      </div>
      )
}

export default CurrentWeatherTitle