#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry
smooth in highp vec2	texCoord;
uniform sampler2D	in_mouseSource;
uniform sampler2D       in_kinectSource;
uniform sampler2D	in_source2;
uniform float           in_tension;
uniform float           in_damping;

// Exit
out highp vec4		out_Color;

void	main()
{
    float	lTouch = clamp(texture2D(in_mouseSource, texCoord).s + texture2D(in_kinectSource, texCoord).s, 0.0f, 1.0f);
    highp vec2	lData = texture2D(in_source2, texCoord).xy;

    highp float	speed = lData.y;
    speed += lTouch * 10.0f;

    highp float	x = 0.5f - lData.x;
    highp float	acc = in_tension * x - in_damping * speed;
    speed += acc;
    out_Color.y = speed;
    out_Color.x = lData.x + speed;
}
