#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Input
uniform sampler2D       in_source1;
uniform sampler2D       in_source2;
smooth in highp vec2    texCoord;
uniform bool            in_texture1Bind;
uniform bool            in_texture2Bind;
uniform vec3            in_lightColor;
uniform vec2            in_mousePos;
uniform float           in_nd;
uniform vec3            in_lightPos[100];
uniform int             in_numberLight;

// Output
out vec4    out_Color;

// Global
float   Krd = 1.0f;
float   Ks = 0.5f;
float   ns = 1.0f;

void    main()
{
    if (!in_texture1Bind)
        out_Color = vec4(0.0f);
    else
    {
        vec3    lN = vec3(0.0f, 0.0f, -1.0f);
        if (in_texture2Bind)
        {
            lN = normalize(texture2D(in_source2, texCoord).rgb);
            lN.b *= -1.0f;
        }
        vec3    lColor = texture2D(in_source1, texCoord).rgb;

        // Reflexion Diffuse & Speculaire
        vec3    lReflection = vec3(0.0f);
        for (int i = 0; i < in_numberLight; i++)
        {
            vec3    lV = vec3(0.0f, 0.0f, -1.0f);
            vec3    lL = normalize(vec3(0.5f, 0.5f, 0.0f) - vec3(texCoord.st, 1.0f));
            float   lCosLN = dot(lL, lN);
            vec3    lR = normalize(2.0f * dot(lN, lV) * lN - lV);
            float   lCosRL = dot(lR, lL);
            vec3    lD = normalize(in_lightPos[i] - vec3(0.5f, 0.5f, 0.0f));
            float   lCosDL = dot(-lL, lD);
            lReflection += in_lightColor * pow(lCosDL, in_nd) * (lColor * Krd * lCosLN + Ks * pow(lCosRL, ns));
        }
        // Couleur final
        out_Color = vec4(lReflection, 1.0f);
    }
}
