#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry
smooth in highp vec2    texCoord;
uniform sampler2D   in_source1;
uniform sampler2D   in_source2;
uniform sampler2D   in_source3;
uniform highp float in_regen;

// Exit
out highp vec4  out_Color;

// Function Def
void    wipe();

void    main()
{
    wipe();
}

void    wipe()
{
    vec4	lRealColor = texture2D(in_source2, texCoord);
    vec4	lForeground = texture2D(in_source1, texCoord);
    float	lAlpha = 1.0f - texture2D(in_source3, texCoord).r;

    if (lAlpha > lRealColor.a + in_regen)
        lAlpha = clamp(lRealColor.a + in_regen, 0.0f, 1.0f);
    out_Color = mix(lRealColor, lForeground, lAlpha);
    out_Color.rgb *= lAlpha;
    out_Color.a = lAlpha;
}
