#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry Variables
smooth in highp vec2    texCoord;
uniform sampler2D       in_Backup;

// Exit Variables
out vec4                out_Color;


void    main()
{
    out_Color = texture2D(in_Backup, texCoord);
}
