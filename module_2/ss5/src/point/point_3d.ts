class Point3D extends Point2D {
    private z: number;

    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }

    getZ() {
        return this.z;
    }

    setZ(z: number) {
        this.z = z;
    }

    getXYZ() {
        return {x: this.getX(), y: this.getY(), z: this.z};
    }

    setXYZ(x: number, y: number, z: number) {
        this.setXY(x, y);
        this.z = z;
    }
}
