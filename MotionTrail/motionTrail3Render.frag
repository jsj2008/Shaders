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

// Exit Variables
out vec4                out_Color;


void    main()
{
    vec4    lMask = texture2D(in_Mask, texCoord);
    if (lMask.r > 0.0f)
        out_Color = texture2D(in_Texture, texCoord);
    else
        out_Color = texture2D(in_Backup, texCoord);
}
