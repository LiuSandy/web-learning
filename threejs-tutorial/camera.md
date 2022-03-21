## 透视摄像机（PerspectiveCamera）
> 他可以提供一个近大远小的 3D 视觉效果，需要四个属性
> 1. fov: 仰角，视野，单位是度，表示视野张开的度数
> 2. near: 视野前端，表示最近能够看到的地方
> 3. far: 视野后端，表示最远能够看到的地方
> 4. aspect: 视野长宽比，间接地定义了视锥前端和后端的宽度, 实际上视锥的宽度是通过高度乘以aspect来得到的.

![PerspectiveCamera](https://threejs.org/manual/resources/frustum-3d.svg)