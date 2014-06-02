#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D       in_Texture;
uniform sampler2D       in_Backup;
uniform sampler2D       in_Mask;
uniform float           in_AlphaSuppression;

// Exit Variables
out vec4                out_Color;


void    main()
{
    vec4    lBackup = texture2D(in_Backup, texCoord);
    vec4    lTex = texture2D(in_Texture, texCoord);
    vec4    lMask = texture2D(in_Mask, texCoord);
    vec4    lColor;

    if (lMask.r > 0.0f)
        lColor = lTex;
    else
    {
        lColor = lBackup;
        lColor.a = max(lColor.a - in_AlphaSuppression, 0.0f);
        lColor.rgb *= 1.0f - in_AlphaSuppression;
    }
    out_Color = lColor;
}
