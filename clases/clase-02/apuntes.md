# Clase 02: Fundamentos de Internet y la Web

---

## Actividad 1: Análisis de Casos

### 1. ¿Es correcto lo que dijo el Rector? ¿Por qué la distinción del director de TI es técnicamente importante?

*   El Rector usa el término **"Internet"** como un destino final, pero Internet es la **infraestructura** (la red de redes física y lógica).
*   **Importancia de la distinción:** El director de TI aclara que se pondrá en la **Web** (*World Wide Web*), que es un **servicio** que corre sobre Internet.
    *   **Internet:** Incluye hardware, cables, protocolos de enrutamiento (`TCP/IP`), correos electrónicos (`SMTP`), transferencia de archivos (`FTP`), etc.
    *   **Web:** Es la colección de páginas y aplicaciones accesibles mediante navegadores usando el protocolo `HTTP`.
*   La distinción es vital porque decidir si la "WWW es pública o no" define la **arquitectura de seguridad**: si será una **Intranet** (privada para la UTN) o un sitio abierto al mundo.

### 2. Si usan HTTP sobre Internet pero solo para usuarios internos de la UTN, ¿están usando Internet o la WWW, o ambos?

**Están usando ambos.**

*   **Internet:** Se utiliza como la autopista de comunicación. Aunque el acceso esté restringido a usuarios internos (quizás mediante una VPN o autenticación específica), los paquetes de datos viajan a través de los protocolos de Internet (`IP`).
*   **WWW:** Se utiliza porque el sistema de notas se entrega a través del protocolo `HTTP` y se visualiza en un navegador web.

### 3. ¿Qué organismo (W3C o IETF) define los estándares más relevantes para este sistema de notas? Justifica.

| Organismo | Responsabilidad Principal en este caso |
| :--- | :--- |
| **W3C** (*World Wide Web Consortium*) | **Más relevante para el usuario y la interfaz.** Define `HTML5`, `CSS` y las APIs de los navegadores para que el sistema de notas se vea y funcione igual en Chrome, Firefox o Safari. |
| **IETF** (*Internet Engineering Task Force*) | **Más relevante para la comunicación.** Define los protocolos subyacentes como `HTTP/HTTPS` y `TCP/IP` que permiten que los datos viajen de forma segura entre el servidor y el estudiante. |

**Justificación:** Si el ejercicio pide elegir el más relevante para el "sistema" como aplicación, suele ser el **W3C**, ya que se encarga de la capa de presentación y la lógica de la aplicación web que los estudiantes usarán directamente.

---

## Actividad 2: Toma de Decisión Técnica

### 1. Identificar la Topología
*   **(A) Sitio de información pública:** Internet
*   **(B) Sistema interno de nómina de RRHH:** Intranet
*   **(C) Portal de constructores:** Extranet

### 2. ¿Cuál requiere mayor inversión en seguridad?
La **Extranet** suele ser la más compleja de asegurar porque se abre una puerta a usuarios externos mientras se protege el recurso interno, lo que requiere mecanismos robustos de autenticación.

### 3. ¿Puede un solo servidor alojar los tres?
**Sí**, conceptualmente un solo servidor físico puede alojar los tres sistemas usando contenedores (**Docker**).

Para la seguridad, se debe implementar un aislamiento fuerte, como:
*   Usar diferentes **subdominios** (por ejemplo: `info.municipalidad`, `rrhh.municipalidad`, `constructores.municipalidad`).

---

## Actividad 3: Disección y Diseño de URLs

### Parte A: Análisis de la URL
**URL:** `https://api.github.com:443/repos/bryancs/isw521/issues?state=open&labels=semana1#comentarios`

*   **Esquema:** `https`
*   **Host:** `api.github.com`
*   **Puerto:** `443`
*   **Ruta:** `/repos/bryancs/isw521/issues`
*   **Query String (Consulta):** `state=open&labels=semana1`
*   **Fragmento:** `#comentarios`

### Parte B: Propuesta de "Clean URLs" para la UTN

1.  **Página de un curso:**
    *   *Propuesta:* `/cursos/isw-521/2026-ii/san-carlos`
2.  **Perfil de un estudiante (carné 2022-0001):**
    *   *Propuesta:* `/estudiantes/2022-0001`
3.  **Lista de materiales de la semana 3 del curso ISW-521:**
    *   *Propuesta:* `/cursos/isw-521/semanas/3/materiales`
