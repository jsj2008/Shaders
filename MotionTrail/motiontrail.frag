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
uniform bool            in_HaveBackup;
uniform float           in_Alpha;

// Exit Variables
out vec4                out_Color;


void    main()
{
    if (in_HaveBackup)
    {
        vec4    lBackup = texture2D(in_Backup, texCoord);
        vec4    lTex = texture2D(in_Texture, texCoord);
        vec4    lMask = texture2D(in_Mask, texCoord);
        vec4    lColor;

        if (lMask.r > 0.0f)
        {
            lColor = mix(lBackup, lTex, in_Alpha);
            lColor.a = 1.0f;
            out_Color = lColor;
        }
        else
            discard;
    }
    else
        out_Color = texture2D(in_Texture, texCoord);
}
