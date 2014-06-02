#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float
#endif

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D       in_Texture;
uniform sampler2D       in_Mask;

// Exit Variables
out vec4                out_Color;


void    main()
{
    float   lMask = texture2D(in_Mask, texCoord).r;
//    if (lMask > 0.0f)
//    {
        out_Color.r = texture2D(in_Texture, texCoord).r;
        out_Color.a = 1.0f;
//    }
//    else
//        discard;
}
