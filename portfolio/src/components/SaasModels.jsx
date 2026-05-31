import './SaasModels.css';

export default function SaasModels() {
  return (
    <div className="saas-background-decorations">
      {/* Torus - Floating Top Left near Hero */}
      <div className="saas-shape shape-torus">
        <img src="/saas-torus.png" alt="3D Torus Background" />
      </div>

      {/* Sphere - Floating Bottom Left near Contact */}
      <div className="saas-shape shape-sphere">
        <img src="/saas-sphere.png" alt="3D Sphere Background" />
      </div>
    </div>
  );
}
