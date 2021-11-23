    let count, setCount;
    let myArr;

    
    // ajaxCallToComp();
    // setInterval(ajaxCallToCompInterval, 60000);

    function Wrapper(){
        [count, setCount] = React.useState(myArr);
        return(
            <div className="wrapper">
            {
                count.map((entry, index) =>{
                    return <ServerDiv 
                        key={index} 
                        name={entry.shortdesc}
                        timer={entry.uptime}
                        status={entry.state}
                        id={entry.id}
                        disk={entry.disk}
                        cpu={entry.cpu}
                        ram={entry.ram}/>
                })
            }
        </div>
        )
    }


    function ServerDiv(props){
        let cardStyle = {};
        cardStyle.background = props.status == 'DOWN' ? 'red' : 'none';
        let cpuStyle = {};
        cpuStyle.width = (100 - props.cpu) + '%';
        let ramStyle = {};
        ramStyle.width = (100 - props.ram) + '%';
        let diskStyle = {};
        diskStyle.width = (100 - props.disk) + '%';

        return(
        <div className="server" id={props.id} style={cardStyle}>
            <div className="server__head">
                <div className="title">{props.name}</div>
                <div className="timer">{props.timer === null ? 'Нет данных' : props.timer + 'д'}</div>
            </div>
            <div className="server__body">
                <div className="cpu">
                    <div className="cpu__title">CPU</div>
                    <div className="cpu__status status">
                        <div className="cpu__bar bar">
                            <div className="cpu__invisiblebar invisiblebar" style={cpuStyle}></div>
                        </div>
                        <div className="cpu__percentage percentage">{props.cpu === null ? 'Н/Д' : props.cpu + '%'}</div>
                    </div>
                </div>

                <div className="ram">
                    <div className="ram__title">RAM</div>
                    <div className="ram__status status">
                        <div className="ram__bar bar">
                            <div className="ram__invisiblebar invisiblebar" style={ramStyle}></div>
                        </div>
                        <div className="ram__percentage percentage">{props.ram === null ? 'Н/Д' : props.ram + '%'}</div>
                    </div>
                </div>

                <div className="disk">
                    <div className="disk__title">DISK</div>
                    <div className="disk__status status">
                        <div className="disk__bar bar">
                            <div className="disk__invisiblebar invisiblebar" style={diskStyle}></div>
                        </div>
                        <div className="disk__percentage percentage">{props.disk === null ? 'Н/Д' : props.disk + '%'}</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    fetch('./static/json/message.json')
        .then(response => response.json())
        .then(json => {
            myArr = Array.from(json['data']);
                    ReactDOM.render(
                        <Wrapper/>,
                        document.getElementById('root')
                    );
                    console.log('Данные загружены');
        });



    // function ajaxCallToComp() {
    //     $.ajax({
    //         type: "POST",
    //         url: window.location,
    //         dataType: 'json',
    //         data: {type: 'getAlerts'},
    //         success: function(msg){
    //             if (msg['data'].length > 0) {
    //                 myArr = Array.from(msg['data']);
    //                 ReactDOM.render(
    //                     <Wrapper/>,
    //                     document.getElementById('root')
    //                 );
    //                 console.log('Данные загружены');
    //             }

    //         }
    //     });  
    // }

    // function ajaxCallToCompInterval() {
    //     $.ajax({
    //         type: "POST",
    //         url: window.location,
    //         dataType: 'json',
    //         data: {type: 'getAlerts'},
    //         success: function(msg){
    //             if (msg['data'].length > 0) {
    //                 setCount(Array.from(msg['data']));
    //                 console.log('Данные обновлены');
    //             }

    //         }
    //     });  
    // }


    