function anakata_projectTo2D (dot3) {
    var zoom =  1 + dot3[2] * anakata_o.fov / anakata_o.mZ;
    return [anakata_o.mX + dot3[0] / zoom, anakata_o.mY - dot3[1] / zoom];
}

function anakata_projectTo3D (dot4) {
    var zoom =  1 + dot4[3] * anakata_o.fov / anakata_o.mW;
    return [dot4[0] / zoom, dot4[1] / zoom, dot4[2] / zoom];
}

function anakata_fastRot (x, y, z, w, xyr, xzr, xwr, yzr, ywr, zwr) {
    var cxy = c(xyr); var sxy = s(xyr);
    var cxz = c(xzr); var sxz = s(xzr);
    var cxw = c(xwr); var sxw = s(xwr);
    var cyz = c(yzr); var syz = s(yzr);
    var cyw = c(ywr); var syw = s(ywr);
    var czw = c(zwr); var szw = s(zwr);
    
    var t = x;
    x = x * cxy + y * sxy;
    y = y * cxy - t * sxy;
    t = x;
    x = x * cxz + z * sxz;
    z = z * cxz - t * sxz;
    t = x;
    x = x * cxw + w * sxw;
    w = w * cxw - t * sxw;
    t = y;
    y = y * cyz + z * syz;
    z = z * cyz - t * syz;
    t = y;
    y = y * cyw + w * syw;
    w = w * cyw - t * syw;
    t = z;
    z = z * czw + w * szw;
    w = w * czw - t * szw;
    return [x, y, z, w];
}


function anakata_updateAngles () {
    anakata_xya += anakata_o.xyStep / 1000;
    anakata_xza += anakata_o.xzStep / 1000;
    anakata_xwa += anakata_o.xwStep / 1000;
    anakata_yza += anakata_o.yzStep / 1000;
    anakata_ywa += anakata_o.ywStep / 1000;
    anakata_zwa += anakata_o.zwStep / 1000;
}

function anakata_rotate (vertex) {
    var v = anakata_o.vertices;
    return anakata_fastRot(v[vertex][0] * anakata_o.scale, v[vertex][1] * anakata_o.scale, v[vertex][2] * anakata_o.scale, v[vertex][3] * anakata_o.scale, anakata_xya, anakata_xza, anakata_xwa, anakata_yza, anakata_ywa, anakata_zwa);
}
