#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Input
uniform sampler2D	in_source2;
uniform sampler2D	in_source3;
smooth in highp vec2	texCoord;
uniform bool		in_texture2Bind;
uniform bool		in_texture3Bind;
uniform float		Kt; // Refract coeff
uniform float		in_velocity;

// Output
out highp vec4	out_Color;

// Global
float	Kr = 1.0f - Kt; // 0 ~ 1 reflect coeff

// Function Def
vec3	LaunchRay(vec3, vec3, float, float);
float	Intersect(float, float, float, float);
vec3	GetTextureColor(vec3, sampler2D);
vec3	genWave(vec2, bool);
vec3	GetNormWave(float);

void	main()
{
    vec4	lColor = vec4(0.0f, 0.0f, 0.0f, 1.0f);
    vec3	lNewRayCenter = vec3(texCoord.st, 0.0f);
    vec3	lV = vec3(0.0f, 0.0f, 1.0f);
    vec3	lNormal = vec3(0.0f);

    // Get normal vector
    lNormal = genWave(vec2(0.5f, 0.5f), true);
    lNormal = normalize(lNormal);

    // Reflection
    if (in_texture3Bind)
        lColor.rgb += Kr * GetTextureColor(LaunchRay(lNewRayCenter, reflect(lV, lNormal), 0.1f, 1.0f), in_source3);

    // Refraction
    if (in_texture2Bind)
        lColor.rgb += Kt * GetTextureColor(LaunchRay(lNewRayCenter, refract(lV, lNormal, 1.0000f / 1.3330f), -0.1f, 1.0f), in_source2);

    out_Color = lColor;
}

vec3	genWave(vec2 center, bool pDisturbance)
{
    // Check if texCoord.st are in ripple length
    vec2	lDirVec = texCoord.xy - center;
    float	lLength = in_velocity - length(lDirVec);
    if ((lLength <= 0.0f || lLength > 0.5f) && !pDisturbance)
        return vec3(0.0f);
    else if ((lLength <= 0.0f || lLength > 0.5f) && pDisturbance)
        lLength = 29.9f + (3.1f * (in_velocity - length(texCoord.xy - vec2(-0.5f, 0.5f))));
    else
        lLength = (6.65f * (1.0f / 0.5f)) * lLength;

    // Calcul Angle
    float	lCos = dot(normalize(lDirVec), vec2(1.0f, 0.0f));
    float	lAngle = sign(lDirVec.y) * acos(lCos);
    float	lSin = sin(-lAngle);

    // Calcul Normal in 2D Space
    vec3	lNorm = GetNormWave(lLength);

    // Move Normal in 3D Space
    mat3x3	lRot = mat3x3(
                lCos, -lSin, 0.0f,
                lSin, lCos, 0.0f,
                0.0f, 0.0f, 1.0f);
    return lRot * lNorm;
}

vec3	GetNormWave(float pLength)
{
    pLength -= 0.01f;
    vec2	lA = vec2(pLength, sin(pLength * 4.0f) * (1.0f / (2.0 + (pLength * 3.0f))));
    pLength += 0.02f;
    vec2	lB = vec2(pLength, sin(pLength * 4.0f) * (1.0f / (2.0 + (pLength * 3.0f))));
    vec2	lVecAB = lB - lA;
    return vec3(lVecAB.y, 0.0f, -lVecAB.x);
}

vec3	LaunchRay(vec3 pRayCenter, vec3 pRayDir, float pPlanCenter, float pPlanNorm)
{
    float	lDist;

    lDist = Intersect(pRayDir.z, pRayCenter.z, pPlanCenter, pPlanNorm);
    return pRayCenter + lDist * pRayDir;
}

vec3	GetTextureColor(vec3 pNewRayCenter, sampler2D pSrc)
{
    if (pNewRayCenter.s < 0.0f)
        pNewRayCenter.s = -pNewRayCenter.s;
    if (pNewRayCenter.t < 0.0f)
        pNewRayCenter.t = -pNewRayCenter.t;
    return texture2D(pSrc, pNewRayCenter.st).rgb;
}

float	Intersect(float pRayDir, float pRayCenter, float pPlanCenter, float pPlanNorm)
{
        float	D = -(pPlanCenter * pPlanNorm);
        float	lDenominator = pPlanNorm * pRayDir;
        float	lNominator = -(pPlanNorm * pRayCenter + D);
        return lNominator * (1.0f / lDenominator);
}
