
    const Wrapper = () => {
        const [loading, setLoading] = React.useState(true);
        const [data, setData] = React.useState([]);

        // const updateData = async (url="")=>{
        //     const response = await fetch(url, {
        //         method: 'POST'
        //     });
        //     const {data} = await response.json();
        //     return data;
        // }

        const updateData = async (url="")=>{
            const response = await fetch(url);
            const {data} = await response.json();
            return data;
        }

        const getData = () => {
            updateData("./static/json/message.json")
            .then((data) => {
                if(data.length > 0){
                    setLoading(false);
                    setData(data);
                    console.log('Данные загружены');
                }
            })
            .catch(()=>{
                console.log('Ошибка при загрузке данных');
            });
        }

        React.useEffect(() => {
            if(loading) {
                getData();
                const intervalId = setInterval(getData, 30000);
            }
            return () => {clearInterval(intervalId)};
        }, []);

        if(loading) return (
            <div>
                <Spinner/>
            </div> 
        )   

        return(
            <div className="wrapper">
            {
                data.map((data, index) =>{
                    return <ServerDiv 
                        data={data}
                        key={index}/>
                })
            }
        </div>
        )
    }

    const ServerDiv = ({data: {desc, uptime, status, id, disk, cpu, ram}}) => {
        const cardStyle = {
            background: status == 'DOWN' ? 'red' : 'none'
        };
        return(
        <div className="server" id={id} style={cardStyle}>
            <div className="server__head">
                <div className="title">{desc}</div>
                <div className="timer">{uptime === null ? 'Нет данных' : uptime + 'д'}</div>
            </div>
            <div className="server__body">
                <ParameterIndicator name='cpu' countUsed={cpu}/>
                <ParameterIndicator name='ram' countUsed={ram}/>
                <ParameterIndicator name='disk' countUsed={disk}/>
            </div>
        </div>
        )
    }

    const ParameterIndicator = ({name, countUsed}) =>{
        const style = {
            width: `${(100 - countUsed)}%`
        };
        return(
        <div className={name}>
            <div className={`${name}__title`}>{name.toUpperCase()}</div>
            <div className={`${name}__status status`}>
                <div className={`${name}__bar bar`}>
                    <div className={`${name}__invisiblebar invisiblebar`} style={style}></div>
                </div>
                <div className={`${name}__percentage percentage`}>{countUsed === null ? 'Н/Д' : countUsed + '%'}</div>
            </div>
        </div>
        )
    }

    const Spinner = () => {
        return(
            <div className = 'spin-wrapper'>
                <div className = 'spinner'>
                </div>
            </div>
        )
    }


    ReactDOM.render(
        <Wrapper/>,
        document.getElementById('root')
    );