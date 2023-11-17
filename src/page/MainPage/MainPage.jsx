import React, {useState} from 'react';
import {CameraFlyTo, EllipseGraphics, Entity, Viewer} from "resium";
import {Cartesian3, Color} from "cesium";
import radiosStore from "../../store/radiosStore";
import * as Cesium from "cesium";
import {observer} from "mobx-react-lite";
import Sidebar from "../../component/Sidebar/Sidebar";

const MainPage = observer(() => {

    let viewer;

    const [rerender, setRerender] = useState(false)
    const forceRerender = () => {
        setRerender(!rerender)
    }

    const handleMapClick = (e) => {
        const {position} = e;

        if (!position) {
            return;
        }

        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartesian = viewer.camera.pickEllipsoid(position, ellipsoid);

        if (!cartesian) {
            return;
        }

        const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);

        return new Cartesian3(longitude, latitude)
    };

    return (
        <>
            <Sidebar forceRerender={forceRerender}/>
            <Viewer ref={(e) => {
                viewer = e && e.cesiumElement;
            }} onClick={e => {
                if (radiosStore.currentRadio && radiosStore.currentMap) {
                    radiosStore.pushRadioToCurrentMap({
                        position: handleMapClick(e),
                        radio: radiosStore.currentRadio
                    })
                    forceRerender()
                }
            }} full>
                <CameraFlyTo destination={Cartesian3.fromDegrees(30.74612, 50.14317, 50000)}/>
                {
                    radiosStore.currentMap && radiosStore.currentMap.radios.map((item, index) => (
                        item.position !== undefined &&
                        <Entity
                            onClick={() => {
                                console.log("some")
                            }}
                            point={{
                                pixelSize: 15,
                                color: Color.RED
                            }}
                            name={item.radio.model}
                            description={`Номер: ${index}
                             Модель: ${item.radio.model} 
                             Радіус: ${item.radio.radius}м`}
                            position={Cartesian3.fromDegrees(item.position.x, item.position.y)}
                        >
                            <EllipseGraphics
                                center={Cartesian3.fromDegrees(item.position.x, item.position.y)}
                                semiMajorAxis={Number(item.radio.radius)}
                                semiMinorAxis={Number(item.radio.radius)}
                                material={Color.BLUE.withAlpha(0.3)} // You can customize the color and transparency
                                outline={true}
                                outlineColor={Color.BLUE}
                                height={-10}
                                numberOfVerticalLines={64} // Optional: Increase the number of lines for a smoother circle
                            />
                        </Entity>

                    ))
                }
            </Viewer>
        </>
    );
});

export default MainPage;