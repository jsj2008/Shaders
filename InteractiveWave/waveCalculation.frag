#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry
smooth in highp vec2	texCoord;
smooth in highp vec2	aroundTex[8];
uniform sampler2D	in_source;
uniform float           in_spread;

// Exit
out highp vec4		out_Color;

void	main()
{
    highp vec2	val = texture2D(in_source, texCoord).xy;
    highp float	val2 = 0.0f;
    highp float	speed = 0.0f;
    if (aroundTex[0].x > 0.0f && aroundTex[1].y > 0.0f)
    {
        val2 = texture2D(in_source, aroundTex[0]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[1].y > 0.0f)
    {
        val2 = texture2D(in_source, aroundTex[1]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[2].x < 1.0f && aroundTex[2].y > 0.0f)
    {
        val2 = texture2D(in_source, aroundTex[2]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[3].x > 0.0f)
    {
        val2 = texture2D(in_source, aroundTex[3]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[4].x < 1.0f)
    {
        val2 = texture2D(in_source, aroundTex[4]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[5].x > 0.0f && aroundTex[5].y < 1.0f)
    {
        val2 = texture2D(in_source, aroundTex[5]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[6].y < 1.0f)
    {
        val2 = texture2D(in_source, aroundTex[6]).x;
        speed += in_spread * (val2 - val.x);
    }
    if (aroundTex[7].x < 1.0f && aroundTex[7].y < 1.0f)
    {
        val2 = texture2D(in_source, aroundTex[7]).x;
        speed += in_spread * (val2 - val.x);
    }
    out_Color.x = val.x + speed;
    out_Color.y = val.y + speed;
}
