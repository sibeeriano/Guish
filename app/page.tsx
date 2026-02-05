import HeaderWithPrismic from './components/HeaderWithPrismic';
import FooterWithPrismic from './components/FooterWithPrismic';
import BackgroundProvider from './components/BackgroundProvider';
import Mantenimiento from './components/Mantenimiento';
import { getLandingPage } from './lib/getLandingPage';
import { getConfiguracionGlobal } from './lib/getConfiguracionGlobal';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import * as prismic from '@prismicio/client';

export default async function Home() {
  // Intentar obtener datos de Prismic
  const [landingPage, config] = await Promise.all([
    getLandingPage('home').catch(() => null),
    getConfiguracionGlobal().catch(() => null),
  ]);

  // Si hay datos de Prismic, usar SliceZone para renderizar dinámicamente
  if (landingPage && landingPage.slices && landingPage.slices.length > 0) {
    // Buscar el slice de configuración de fondo (puede no estar en la Slice Zone del tipo landing)
    const fondoSlice = (landingPage.slices as Array<{ slice_type: string }>).find(
      (slice) => slice.slice_type === 'configuracion_fondo'
    ) as prismic.Content.ConfiguracionFondoSlice | undefined;
    
    // Extraer datos de fondo del slice
    const fondoConfig = fondoSlice ? {
      tipo: (fondoSlice.primary?.tipo_fondo as string) || 'Gradiente',
      color: (fondoSlice.primary?.color_fondo as string) || undefined,
      imagen: fondoSlice.primary?.imagen_fondo?.url || undefined,
    } : undefined

    // Usar datos de la landing page (tiene prioridad sobre config global)
    const headerConfig = {
      logo: landingPage.logo || config?.logo,
      menuItems: landingPage.menuItems && landingPage.menuItems.length > 0 
        ? landingPage.menuItems 
        : config?.menuItems,
    };

    const footerConfig = {
      footerTexto: landingPage.footerTexto || config?.footerTexto,
      footerContacto: landingPage.footerContacto || config?.footerContacto,
      redesSociales: landingPage.redesSociales && landingPage.redesSociales.length > 0
        ? landingPage.redesSociales
        : config?.redesSociales,
    };

    return (
      <BackgroundProvider fondoConfig={fondoConfig}>
        <div className="flex min-h-screen flex-col">
          <HeaderWithPrismic config={headerConfig} />
          <main className="flex-1">
            <SliceZone slices={landingPage.slices} components={components} />
          </main>
          <FooterWithPrismic config={footerConfig} />
        </div>
      </BackgroundProvider>
    );
  }

  // Página sin publicar o sin contenido: solo vista de mantenimiento con fondo blanco
  return (
    <div className="min-h-screen bg-white">
      <Mantenimiento />
    </div>
  );
}
